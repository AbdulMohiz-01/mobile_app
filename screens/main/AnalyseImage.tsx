import { images } from "constants/paths";
import React from "react";
import { Text, View, StyleSheet, Image, Touchable, TouchableOpacity } from "react-native";

const AnalyseImage: React.FC = () => {
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
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        <View style={styles.instructionContainer}>
          {/* instructions */}
          <View style={styles.instructionWrapper}>
            <Text style={styles.instructionText}>Image only</Text>
            <Text style={styles.instructionSubText}>JPEG, JPG</Text>
          </View>
          <View style={styles.instructionWrapper}>
            <Text style={styles.instructionText}>10 minutes</Text>
            <Text style={styles.instructionSubText}>max duration</Text>
          </View>
          <View style={[styles.instructionWrapper, { borderRightWidth: 0 }]}>
            <Text style={styles.instructionText}>5 MB</Text>
            <Text style={styles.instructionSubText}>image size</Text>
          </View>
        </View>
      </View>
    </View>
  )
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

});

export default AnalyseImage;
