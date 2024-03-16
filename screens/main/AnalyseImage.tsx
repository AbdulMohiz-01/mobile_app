import { images } from "constants/paths";
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { icons } from "constants/paths";
import { analyseImage } from "service/screens/analyseImageService";

const AnalyseImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChooseImage = async () => {
    if (selectedImage) {
      console.log("⚒️⚒️", selectedImage);
      await analyseImage(selectedImage);
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
    }
  };

  return (
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
        <TouchableOpacity style={styles.uploadButton} onPress={handleChooseImage}>
          <Text style={styles.uploadButtonText}>{selectedImage ? "Analyse Image" : "Upload Image"}</Text>
        </TouchableOpacity>
        {selectedImage && (
          <View style={styles.selectedImageWrapper}>
            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.deleteIcon} onPress={() => setSelectedImage(null)}>
              <Image source={icons.trash} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 20,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 16,
    color: "gray",
  },
  sampleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  sampleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sampleImagesWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sampleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  uploadWrapper: {
    marginVertical: 20,
  },
  uploadButton: {
    backgroundColor: "#199a8e",
    padding: 12,
    borderRadius: 999,
    marginVertical: 30,
  },
  uploadButtonText: {
    color: "#ffff",
    textAlign: "center",
  },
  instructionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  instructionWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "gray",
    paddingRight: 10,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionSubText: {
    color: "gray",
  },
  selectedImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  selectedImageWrapper: {
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 999,
    // give little border shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default AnalyseImage;
