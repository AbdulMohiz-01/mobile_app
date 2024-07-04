import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { icons, images } from "constants/paths";
import { theme } from "constants/theme";
import { navigate } from "@navigation/NavigationService";
import ArticleList from "component/article/ArticleList";
import { getAllArticles, getArticleByTag } from "service/article/articleService";
import { Input } from "component";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [learnMoreLoading, setLearnMoreLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

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

  const handleLearnMore = async () => {
    setLearnMoreLoading(true);
    const article = await getArticleByTag("AI");
    console.log(article);
    const _f = article[0];
    const _id = _f.id;
    setLearnMoreLoading(false);
    navigate("ArticleDetail", { articleId: _id });
  }


  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.attentionText}>
        Find your desired eye health solution
      </Text>
      <TouchableOpacity onPress={() => navigate("Profile", {})}>
        <Text style={[styles.profileIcon, { backgroundColor: user?.profileColor || "#f7a102" }]}>
          {user?.name[0]}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearch = () => (
    <View style={styles.search}>
      <Input
        value={searchText}
        onChangeText={(value) => setSearchText(value)}
        placeholder="Search eye disease"
        beforeIcon="search"
        width="100%"
      />
    </View>
  );

  const renderNavigation = () => (
    <View style={styles.navigationContainer}>
      {
        // if search text contains retinopathy then show 
        searchText.toLowerCase().includes("retinopathy") || searchText == "" ? (
          <TouchableOpacity onPress={() => navigate("AnalyseImage", {})}>
            <View style={styles.navChilds}>
              <Image source={icons.retinopathy} style={styles.navIcon} />
              <Text style={styles.navChildText}>Retinopathy</Text>
            </View>
          </TouchableOpacity>
        ) : (
          // no diseas found
          <View style={styles.navChilds}>
            <Text>No Search Results</Text>
          </View>

        )
      }
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerWrapper}>
      <View style={styles.bannerLeftChild}>
        <Text style={styles.bannerLeftChildText}>
          Early protection for your family's eye health.
        </Text>
        <TouchableOpacity style={styles.bannerButton} onPress={handleLearnMore}>
          {
            learnMoreLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Learn More</Text>
          }
        </TouchableOpacity>
      </View>
      <View style={styles.bannerRightChild}>
        <Image source={images.homeBannerImage} style={styles.bannerImage} />
      </View>
    </View>
  );

  const renderArticles = () => (
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
  );

  const renderItem = ({ item }: any) => {
    switch (item.key) {
      case "header":
        return renderHeader();
      case "search":
        return renderSearch();
      case "navigation":
        return renderNavigation();
      case "banner":
        return renderBanner();
      case "articles":
        return renderArticles();
      default:
        return null;
    }
  };

  const sections = [
    { key: "header" },
    { key: "search" },
    { key: "navigation" },
    { key: "banner" },
    { key: "articles" },
  ];

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      style={styles.wrapper}
    />
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
  profileIcon: {
    // fontSize: 30,
    width: 30,
    height: 30,
    borderRadius: 999,
    textAlign: "center",
    lineHeight: 30,
    backgroundColor: theme.primary_color,
    color: "#fff",
    fontWeight: "bold",

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Add a background color to make it stand out
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  attentionText: {
    fontSize: 20, // Increase the font size
    fontWeight: 'bold', // Make the text bold
    color: '#333', // Change the color to a darker shade
    width: '80%', // Set the width to 80% of the screen
  },
  icon: {
    width: 25,
    height: 25,
  },
  search: {
    display: "flex",
    marginTop: 20,
    marginLeft: 10,
    // width: "100%",
    width: 450
  },
  navigationContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 20,
  },
  navChilds: {
    alignItems: "center",
    marginBottom: 10,
  },
  navIcon: {
    width: 40,
    height: 40,
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
    marginLeft: 10,
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
    width: 120,
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
