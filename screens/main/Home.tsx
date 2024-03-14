import { Input, PrimaryButton } from "component";
import React from "react";
import { Text, View, StyleSheet, Image, Button, Touchable, TouchableOpacity } from "react-native";
import { icons } from "constants/paths";
import { theme } from "constants/theme";
import { navigate } from "@navigation/NavigationService";

const Home: React.FC = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <View style={styles.wrapper}>
      {/* header section */}
      <View style={styles.header}>
        <Text style={styles.attentionText}>Find your desire Eye health solution</Text>
        <Image source={icons.bell} style={styles.icon} />
      </View>
      {/* search section */}
      <View style={styles.search}>
        <Input
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
          placeholder="Search eye disease, articles..."
          beforeIcon="search"
          width="100%"
        />
      </View>

      {/* search results container */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigate('AnalyseImage', {})}>
          <View style={styles.navChilds}>
            <Image source={icons.eyeOpen} style={styles.navIcon} />
            <Text style={styles.navChildText}>Retinopathy</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* banner */}
      <View style={styles.bannerWrapper}>
        <View style={styles.bannerLeftChild}>
          <Text style={styles.bannerLeftChildText}>
            Early protection for your family's eye health.
          </Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerRightChild}>
          <Image source={icons.homeBannerImage} style={styles.bannerImage} />
        </View>
      </View>

      {/* health articles */}
      <View>
        {/* header for articeles */}
        <View>

        </View>
        {/* articles section */}
        <View>

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
    paddingHorizontal: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // marginVertical: 20,
    gap: 10,
  },
  attentionText: {
    width: "70%",
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    width: 15,
    height: 15,
  },
  search: {
    marginTop: 20,
    marginHorizontal: 10,
    width: "100%",
  },
  navigationContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  navChilds: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    gap: 5,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navChildText: {
    fontSize: 14,
    // give it a little dim color
    color: "#9fa6af",
  },
  bannerWrapper: {
    marginTop: 20,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e8f3f1",
    borderRadius: 10,

  },
  bannerLeftChild: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  bannerRightChild: {
    width: "40%",
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // set the image to cover
    resizeMode: "cover",

  },
  bannerLeftChildText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: "100%",
  },
  bannerButton: {
    backgroundColor: theme.primary_color,
    padding: 10,
    borderRadius: 999,
    width: 100,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }
});

export default Home;
