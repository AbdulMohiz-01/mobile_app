import { images } from "constants/paths";
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { icons, loaders } from "constants/paths";
import { analyseImage } from "service/screens/analyseImageService";
import { DiabeticRetinopathyResult, ServerResult, diabeticRetinopathyData } from "model/results";
import { styles } from "style/analyseImage";
const AnalyseImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ServerResult | null>(null);
  const [descriptiveResult, setDescriptiveResult] = useState<DiabeticRetinopathyResult | null>(null);

  const handleChooseImage = async () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      const response = await analyseImage(selectedImage);
      if (response.status) {
        setResult(prevState => ({
          ...prevState,
          class: response.data.predicted_class.toString(),
          confidence: response.data.confidence,
          predictons: response.data.predictions
        }))
        const predictedClass = response.data.predicted_class.toString();
        setDescriptiveResult(diabeticRetinopathyData[predictedClass]);

      }
      setSelectedImage(null);
      setIsAnalyzing(false);
      return;
    }
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
      setResult(null);
      setDescriptiveResult(null);
    }
  };

  function getAttentionTextColor() {
    if (result?.class === "0" || result?.class === "1") {
      return "#00ff00";
    }
    if (result?.class === "2") {
      return "#ffff00";
    }
    if (result?.class === "3") {
      return "#ff0000";
    }
    if (result?.class === "4") {
      return "#8b0000";
    }
  }
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
              <TouchableOpacity style={styles.deleteIcon} onPress={() => setSelectedImage(null)}>
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
                <View style={styles.instructionWrapper}>
                  <Text style={styles.instructionText}>1 minute</Text>
                  <Text style={styles.instructionSubText}>max duration</Text>
                </View>
                <View style={[styles.instructionWrapper, { borderRightWidth: 0 }]}>
                  <Text style={styles.instructionText}>10 MB</Text>
                  <Text style={styles.instructionSubText}>image size</Text>
                </View>
              </View> : (
                // display descriptive results here
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
                      <View style={styles.resultDetailsButton}>
                        <Text style={styles.resultDetailsButtonText}>Learn more</Text>
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
