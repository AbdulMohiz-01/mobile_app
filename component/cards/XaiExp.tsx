import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const XaiInterpretation = ({ xaiImageUri }) => {
    return (
        <View style={styles.xaiContainer}>
            <Text style={styles.xaiHeading}>XAI Interpretation</Text>
            {xaiImageUri && (
                <View style={styles.xaiImageBorder}>
                    <Image source={{ uri: xaiImageUri }} style={styles.xaiImage} resizeMode="contain" />
                </View>
            )}
            <View style={styles.noteContainer}>
                <View style={styles.noteTextContainer}>
                    <Text style={styles.noteHeading}>Note: </Text>
                    <Text style={styles.noteText}>
                        The blue areas in the XAI image indicate the regions that influenced the model's decision the most. These areas might show signs of swelling in blood vessels or other anomalies related to diabetic retinopathy. The red areas, on the other hand, are less significant in the decision-making process.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    xaiContainer: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    xaiHeading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    xaiImageBorder: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    xaiImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    noteContainer: {
        backgroundColor: '#e8f5e9',
        padding: 10,
        borderRadius: 8,
    },
    noteTextContainer: {
        flexDirection: 'row',
    },
    noteHeading: {
        fontWeight: '600',
        marginRight: 5,
        color: '#1c9a8e',
    },
    noteText: {
        flex: 1,
        color: '#555',
        textAlign: 'justify',
    },
});

export default XaiInterpretation;
