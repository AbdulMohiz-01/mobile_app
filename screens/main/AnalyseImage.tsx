import { images } from "constants/paths";
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform, ScrollView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { icons, loaders } from "constants/paths";
import { analyseImage } from "service/screens/analyseImageService";
import { DiabeticRetinopathyResult, ServerResult, diabeticRetinopathyData } from "model/results";
import { styles } from "style/analyseImage";
import { PieChart, BarChart } from "react-native-gifted-charts"; // Assuming you're using this library
import { getXaiImage } from "service/artifact/artifactService";
import { LinearGradient } from "expo-linear-gradient";
import { getContentFromGemini } from "service/gemini/gemini";
import CustomAlert from "component/alerts/CustomeAlert";

const AnalyseImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ServerResult | null>(null);
  const [descriptiveResult, setDescriptiveResult] = useState<DiabeticRetinopathyResult | null>(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [xaiImageUri, setXaiImageUri] = useState<string | null>(null); // New state for XAI image
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie'); // State to manage chart type
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleChooseImage = async () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      const response = await analyseImage(selectedImage);

      if (response.status) {
        // check if its a valid class
        if (response.data.predicted_class === '5') {
          setIsAnalyzing(false);
          Alert.alert("Invalid Image", "The image you uploaded is not a valid retinal image. Please upload a valid retinal image and try again.");
          // setIsAlertVisible(true);
          return;
        }
        const xaiImage = await getXaiImage();
        setResult(prevState => ({
          ...prevState,
          class: response.data.predicted_class.toString(),
          confidence: response.data.confidence,
          predictons: response.data.predictions
        }))
        const predictedClass = response.data.predicted_class.toString();
        const pieData = [
          { value: response.data.predictions[0], color: '#00ff00' },
          { value: response.data.predictions[1], color: '#e6e600' },
          { value: response.data.predictions[2], color: '#ff0000' },
          { value: response.data.predictions[3], color: '#89060e' },
          { value: response.data.predictions[4], color: '#87050d' }
        ];
        setPieChartData(pieData);
        setBarChartData(pieData.map((item, index) => ({
          value: item.value,
          label: ['No Dr', 'Mild', 'Moderate', 'Severe', 'Proliferative'][index],
          frontColor: item.color
        })));
        const descriptiveData = await getContentFromGemini("No Diabetic Retinopathy");
        setDescriptiveResult(descriptiveData[0]);
        setXaiImageUri(xaiImage); // Set the XAI image URI
      }
      setSelectedImage(null);
      setIsAnalyzing(false);
      return;
    }
    setPieChartData([]);
    setDescriptiveResult(null);
    setResult(null);
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      // return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    // console.log(result);
    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
      setResult(null);
      setDescriptiveResult(null);
      setPieChartData([]);
    }
  };

  function getPercentageOfPrediction(prediction?: number) {
    if (prediction != null) {
      return Math.round(prediction * 100) + "%";
    }
    return "0%";
  }

  const getAttentionTextColor = () => {
    switch (result?.class) {
      case '0':
        return "#00ff00"; // Light green
      case '1':
        return "#e6e600"; // Light green
      case '2':
        return "#ff0000"; // Light yellow
      case '3':
        return "#89060e"; // Light red
      case '4':
        return "#87050d"; // Dark red
      default:
        return "#000"; // Default color if none matches
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Upload your Retinal Image</Text>
          {/* subtext */}
          <Text style={styles.headerSubText}>Submit your retinal image for a quick and accurate assesment</Text>
        </View>
        {/* sample images */}
        <View style={styles.sampleContainer}>
          <Text style={styles.sampleText}>Sample Images</Text>
          <View style={styles.sampleImagesWrapper}>
            <Image source={images.sample1} style={styles.sampleImage} />
            <Image source={images.sample2} style={styles.sampleImage} />
          </View>
        </View>

        <CustomAlert isVisible={isAlertVisible} onClose={() => setIsAlertVisible(false)} />

        <View style={styles.uploadWrapper}>
          {
            !isAnalyzing ?
              <TouchableOpacity style={styles.uploadButton} onPress={handleChooseImage}>
                <Text style={styles.uploadButtonText}>{selectedImage ? "Analyse Image" : "Upload Image"}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.uploadButton, styles.analysing]} onPress={handleChooseImage} disabled={isAnalyzing}>
                <Image source={loaders.circle} style={[styles.icon, styles.inLineLoader]} />
                <Text style={styles.uploadButtonText}>Analysing...</Text>
              </TouchableOpacity>
          }
          {selectedImage && (
            <View style={styles.selectedImageWrapper}>
              <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.deleteIcon} onPress={() => {
                setSelectedImage(null);
                setIsAnalyzing(false);
              }}>
                <Image source={icons.trash} style={styles.icon} />
              </TouchableOpacity>
            </View>
          )}
          {
            !result && !descriptiveResult ?
              <View style={styles.instructionContainer}>
                {/* instructions */}
                <View style={styles.instructionWrapper}>
                  <Text style={styles.instructionText}>Image only</Text>
                  <Text style={styles.instructionSubText}>JPEG, JPG</Text>
                </View>
                <View style={[styles.instructionWrapper, { borderRightWidth: 0 }]}>
                  <Text style={styles.instructionText}>1 minute</Text>
                  <Text style={styles.instructionSubText}>max duration</Text>
                </View>
                {/* <View style={[styles.instructionWrapper, { borderRightWidth: 0 }]}>
                  <Text style={styles.instructionText}>10 MB</Text>
                  <Text style={styles.instructionSubText}>image size</Text>
                </View> */}
              </View> : (
                <View>
                  {
                    pieChartData.length > 0 && (
                      <View style={styles.chartContainer}>
                        <LinearGradient
                          colors={['hsla(330, 36%, 53%, 1)', 'hsla(289, 68%, 19%, 1)']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.gradientBackground}
                        >
                          <View style={styles.chartHeadingWrapper}>
                            <Text style={styles.chartHeading}>Predictions Chart</Text>
                            <View style={styles.chartButtonsContainer}>
                              <TouchableOpacity
                                style={[styles.chartButton, chartType === 'pie' && styles.activeChartButton]}
                                onPress={() => setChartType('pie')}
                              >
                                <Image source={icons.pieChart} style={styles.chartButtonIcon} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[styles.chartButton, chartType === 'bar' && styles.activeChartButton]}
                                onPress={() => setChartType('bar')}
                              >
                                <Image source={icons.barChart} style={styles.chartButtonIcon} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          {chartType === 'pie' ? (
                            <View style={styles.pieChartWrapper}>
                              <PieChart data={pieChartData} radius={80} />
                            </View>
                          ) : (
                            <View style={styles.barChartWrapper}>
                              <BarChart data={pieChartData} />
                            </View>
                          )}
                          <View style={styles.legendsWrapper}>
                            <View>
                              <Text style={[styles.legendColorBar, { backgroundColor: '#00ff00' }]}></Text>
                              <Text style={styles.legend}>No Dr: </Text>
                              <Text style={[styles.legendValue, result.class === '0' ? styles.boldText : styles.nullclass]}>
                                {getPercentageOfPrediction(result.predictons[0])}
                              </Text>
                            </View>
                            <View>
                              <Text style={[styles.legendColorBar, { backgroundColor: '#e6e600' }]}></Text>
                              <Text style={styles.legend}>Mild: </Text>
                              <Text style={[styles.legendValue, result.class === '1' ? styles.boldText : styles.nullclass]}>
                                {getPercentageOfPrediction(result.predictons[1])}
                              </Text>
                            </View>
                            <View>
                              <Text style={[styles.legendColorBar, { backgroundColor: '#ff0000' }]}></Text>
                              <Text style={styles.legend}>Moderate: </Text>
                              <Text style={[styles.legendValue, result.class === '2' ? styles.boldText : styles.nullclass]}>
                                {getPercentageOfPrediction(result.predictons[2])}
                              </Text>
                            </View>
                            <View>
                              <Text style={[styles.legendColorBar, { backgroundColor: '#8b0000' }]}></Text>
                              <Text style={styles.legend}>Severe: </Text>
                              <Text style={[styles.legendValue, result.class === '3' ? styles.boldText : styles.nullclass]}>
                                {getPercentageOfPrediction(result.predictons[3])}
                              </Text>
                            </View>
                            <View>
                              <Text style={[styles.legendColorBar, { backgroundColor: '#8b0000' }]}></Text>
                              <Text style={styles.legend}>Proliferative: </Text>
                              <Text style={[styles.legendValue, result.class === '4' ? styles.boldText : styles.nullclass]}>
                                {getPercentageOfPrediction(result.predictons[4])}
                              </Text>
                            </View>
                          </View>
                        </LinearGradient>
                      </View>
                    )
                  }
                  <View style={styles.xaiContainer}>
                    <Text style={styles.xaiHeading}>XAI Interpretation</Text>
                    {xaiImageUri && (
                      <View style={styles.xaiImageBorder} >
                        <Image source={{ uri: xaiImageUri }} style={[styles.xaiImage1]} />
                      </View>
                    )}
                    <View style={styles.noteContainer}>
                      <View style={styles.noteTextContainer}>
                        <Text style={styles.noteHeading}>Note: </Text>
                        <Text style={styles.noteText}>
                          The blue areas in the XAI image indicate the regions that influenced the model's decision the most. These areas might show signs of swelling in blood vessels or other anomalies related to diabetic retinopathy. The red areas, on the other hand, are less significant in the decision-making process.
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.resultContainer}>
                    <View style={styles.resultWrapper}>
                      <Text style={[styles.resultAttentionText, { color: getAttentionTextColor() }]}>{descriptiveResult?.description}</Text>
                      <View style={styles.resultDetails}>
                        <Text style={styles.resultDetailsHeading}>Details</Text>
                        <Text style={styles.resultDetailsText}>{descriptiveResult?.details.short_description}</Text>
                        <Text></Text>
                        <Text style={styles.resultDetailsText}>{descriptiveResult?.details.stage}</Text>
                        <Text></Text>
                        <Text style={styles.resultDetailsHeading}>Precautions</Text>
                        <Text style={styles.resultDetailsText}>{descriptiveResult?.details.precautions}</Text>
                        <TouchableOpacity>
                          <Text style={styles.resultDetailsButtonText}>Learn More</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default AnalyseImage;