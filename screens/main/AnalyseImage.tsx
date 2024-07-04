import { images } from "constants/paths";
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform, ScrollView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { icons, loaders } from "constants/paths";
import { analyseImage } from "service/screens/analyseImageService";
import { DiabeticRetinopathyResult, ServerResult, diabeticRetinopathyData } from "model/results";
import { PieChart, BarChart } from "react-native-gifted-charts"; // Assuming you're using this library
import { getXaiImage } from "service/artifact/artifactService";
import { LinearGradient } from "expo-linear-gradient";
import { getContentFromGemini } from "service/gemini/gemini";
import CustomAlert from "component/alerts/CustomeAlert";
import { getArticleByClassNumber, getArticleByTag } from "service/article/articleService";
import { navigate } from "@navigation/NavigationService";
import { ActivityIndicator } from "react-native-paper";
import HeaderSection from "component/cards/headerCard";
import PredictionsChart from "component/cards/PredictionChart";
import { styles } from "style/analyseImage";
import XaiInterpretation from "component/cards/XaiExp";

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
  const [learnMoreLoading, setLearnMoreLoading] = useState<boolean>(false);
  const [predictedClassNumber, setPredictedClassNumber] = useState<number>(0);

  const classNames = {
    '0': "No Diabatic Retinopathy",
    '1': "Mild Diabatic Retinopathy",
    '2': "Moderate Diabatice Retinopathy",
    '3': "Severe Diabatice Retinopathy",
    '4': "Proliferative Diabatic Retinopathy"
  }

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
        setPredictedClassNumber(parseInt(response.data.predicted_class));
        const xaiImage = await getXaiImage();
        console.log("💕💕", xaiImage)
        setResult(prevState => ({
          ...prevState,
          class: response.data.predicted_class.toString(),
          confidence: response.data.confidence,
          predictons: response.data.predictions
        }));
        const predictedClass = response.data.predicted_class.toString();
        const pieData = [
          { value: response.data.predictions[0], color: '#2ecc71' }, // Soft green for No DR
          { value: response.data.predictions[1], color: '#f1c40f' }, // Bright yellow for Mild
          { value: response.data.predictions[2], color: '#e67e22' }, // Vibrant orange for Moderate
          { value: response.data.predictions[3], color: '#e74c3c' }, // Bold red for Severe
          { value: response.data.predictions[4], color: '#c0392b' }  // Deep red for Proliferative
        ];

        setPieChartData(pieData);
        setBarChartData(pieData.map((item, index) => ({
          value: item.value,
          label: ['No Dr', 'Mild', 'Moderate', 'Severe', 'Proliferative'][index],
          frontColor: item.color
        })));
        let descriptiveData: any = await getContentFromGemini(classNames[response.data.predicted_class]);
        if (descriptiveData === null) {
          descriptiveData = diabeticRetinopathyData[predictedClass];
        }
        const parsedResults = descriptiveData[classNames[response.data.predicted_class]];
        setDescriptiveResult(parsedResults);
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
      setXaiImageUri(null);
    }
  };

  const handlerLearnMore = async () => {
    setLearnMoreLoading(true);
    const article = await getArticleByClassNumber(predictedClassNumber);
    const _f = article[0];
    const _id = _f.id;
    setLearnMoreLoading(false);
    navigate("ArticleDetail", { articleId: _id });
  }

  const getPercentageOfPrediction = (prediction) => {
    if (prediction != null) {
      return Math.round(prediction * 100) + "%";
    }
    return "0%";
  }

  const getAttentionTextColor = () => {
    switch (result?.class) {
      case '0':
        return "#2ecc71"; // Soft green for No DR
      case '1':
        return "#f1c40f"; // Bright yellow for Mild
      case '2':
        return "#e67e22"; // Vibrant orange for Moderate
      case '3':
        return "#e74c3c"; // Bold red for Severe
      case '4':
        return "#c0392b"; // Deep red for Proliferative
      default:
        return "#000"; // Default color if none matches
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.wrapper}>
        <HeaderSection />

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
                setDescriptiveResult(null)
                setXaiImageUri(null)
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
                        <PredictionsChart
                          chartType={chartType}
                          setChartType={setChartType}
                          pieChartData={pieChartData}
                          barChartData={barChartData}
                          result={result}
                          getPercentageOfPrediction={getPercentageOfPrediction}
                        />
                      </View>
                    )
                  }
                  {
                    xaiImageUri && <XaiInterpretation xaiImageUri={xaiImageUri} />
                  }

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
                        <TouchableOpacity onPress={handlerLearnMore}>
                          {
                            learnMoreLoading ? <ActivityIndicator /> : <Text style={styles.resultDetailsButtonText}>Learn More</Text>
                          }
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
