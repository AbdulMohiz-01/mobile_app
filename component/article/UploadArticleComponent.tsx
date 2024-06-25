import { Article } from 'model/article';
import { User } from 'model/user';
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Chip, Checkbox, Title, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const UploadArticleComponent = () => {
    const user: User = useSelector((state: RootState) => state.user.user);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPublished, setIsPublished] = useState(false);
    const [category, setCategory] = useState('');
    const [totalReadTime, setTotalReadTime] = useState<number>(0);

    const handleAddTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleSubmit = () => {
        const newArticle: Article = {
            id: '',
            title,
            content,
            author: user.name,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            tags,
            isPublished,
            category,
            totalReadTime,
        };

        console.log('Article submitted:', newArticle);
        // Add your submit logic here
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Upload New Article</Title>
            <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                label="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={5}
                style={styles.input}
            />
            <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <TextInput
                label="Tags (comma separated)"
                value={tags.join(', ')}
                onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
                style={styles.input}
            />
            <TextInput
                label="Total Read Time (in minutes)"
                value={totalReadTime.toString()}
                keyboardType="numeric"
                onChangeText={(text) => setTotalReadTime(Number(text))}
                style={styles.input}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isPublished ? 'checked' : 'unchecked'}
                    onPress={() => setIsPublished(!isPublished)}
                />
                <Text>Publish</Text>
            </View>
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Submit
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
});

export default UploadArticleComponent;
