import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Chip } from 'react-native-paper';
import { getArticle } from 'service/article/articleService';

interface Props {
  navigation: any;
  route: any;
}

const ViewArticle: React.FC<Props> = ({ navigation, route }) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchArticle = async () => {
    const articleId = route.params.articleId;
    const fetchedArticle = await getArticle(articleId);
    setArticle(fetchedArticle);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#199a8e" />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found.</Text>
      </View>
    );
  }

  const renderContent = (content: string) => {
    const regex = /<note>(.*?)<\/note>/g;
    const parts = content.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <View key={index} style={styles.noteContainer}>
            <Text style={styles.noteText}>{part}</Text>
          </View>
        );
      } else {
        return part.split('\n').map((paragraph, paraIndex) => (
          <Text key={paraIndex} style={styles.paragraph}>
            {paragraph}
          </Text>
        ));
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.displayImage }} style={styles.displayImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
        <Text style={styles.date}>{article.createdAt} • {article.totalReadTime} min read</Text>
        <View style={styles.tagsContainer}>
          {article.tags.map((tag: string, index: number) => (
            <Chip key={index} style={styles.tag}>{tag}</Chip>
          ))}
        </View>
        {renderContent(article.content)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
  },
  displayImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  category: {
    fontSize: 16,
    color: '#199a8e',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    marginRight: 5,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
  noteContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#199a8e',
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default ViewArticle;
