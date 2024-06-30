import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ArticleCard from './ArticleCard';  // Adjust the import path as necessary
import { Article } from 'model/article';

interface ArticleListProps {
    articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
    return (
        <FlatList
            data={articles}
            renderItem={({ item }) => <ArticleCard article={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
});

export default ArticleList;
