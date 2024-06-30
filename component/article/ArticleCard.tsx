import { Article } from 'model/article';
import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { navigate } from '@navigation/NavigationService';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {

    const handlePress = () => {
        navigate('ArticleDetail', {
            articleId: article.id,
        });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: article.displayImage }} />
                <Card.Content>
                    <Chip style={styles.chip}>{article.category}</Chip>
                    <Title style={styles.title}>{article.title}</Title>
                    <Paragraph>{article.createdAt} • {article.totalReadTime} min read</Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    chip: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    title: {
        maxWidth: '90%',
    }
});

export default ArticleCard;
