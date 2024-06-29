import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { icons, images } from "constants/paths";
import { theme } from "constants/theme";
import { navigate } from "@navigation/NavigationService";
import ArticleList from "component/article/ArticleList";
import { getAllArticles } from "service/article/articleService";
import { Input } from "component";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getAllArticles();
      setArticles(response);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.wrapper}>
      {/* header section */}
      <View style={styles.header}>
        <Text style={styles.attentionText}>
          Find your desired eye health solution
        </Text>
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

      {/* navigation container */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigate("AnalyseImage", {})}>
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
          <Image source={images.homeBannerImage} style={styles.bannerImage} />
        </View>
      </View>

      {/* health articles */}
      <View style={styles.articleSection}>
        <View style={styles.articleHeader}>
          <Text style={styles.articleTitle}>Health Articles</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={theme.primary_color} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load articles.</Text>
            <TouchableOpacity onPress={fetchArticles} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ArticleList articles={articles} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  attentionText: {
    width: "70%",
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    width: 25,
    height: 25,
  },
  search: {
    marginTop: 20,
    width: "100%",
  },
  navigationContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  navChilds: {
    alignItems: "center",
    marginBottom: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navChildText: {
    fontSize: 14,
    color: "#9fa6af",
  },
  bannerWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e8f3f1",
    borderRadius: 10,
  },
  bannerLeftChild: {
    width: "60%",
  },
  bannerRightChild: {
    width: "40%",
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  bannerLeftChildText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bannerButton: {
    backgroundColor: theme.primary_color,
    padding: 10,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  articleSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  articleHeader: {
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: theme.primary_color,
    padding: 10,
    borderRadius: 999,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
