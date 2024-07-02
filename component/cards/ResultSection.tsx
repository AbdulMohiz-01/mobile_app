import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ResultsSection = ({ descriptiveResult, getAttentionTextColor, handlerLearnMore, learnMoreLoading }) => {
    return (
        <View style={styles.resultContainer}>
            <View style={styles.resultWrapper}>
                <Text style={[styles.resultAttentionText, { color: getAttentionTextColor() }]}>
                    {descriptiveResult?.description}
                </Text>
                <View style={styles.resultDetails}>
                    <Text style={styles.resultDetailsHeading}>Details</Text>
                    <Text style={styles.resultDetailsText}>{descriptiveResult?.details.short_description}</Text>
                    <Text style={styles.resultDetailsText}>{descriptiveResult?.details.stage}</Text>
                    <Text style={styles.resultDetailsHeading}>Precautions</Text>
                    <Text style={styles.resultDetailsText}>{descriptiveResult?.details.precautions}</Text>
                    <TouchableOpacity onPress={handlerLearnMore}>
                        {learnMoreLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <Text style={styles.resultDetailsButtonText}>Learn More</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    resultContainer: {
        width: '100%',
        marginBottom: 20,
        marginTop: 20,
    },
    resultWrapper: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
    },
    resultAttentionText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    resultDetails: {
        marginTop: 10,
    },
    resultDetailsHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    resultDetailsText: {
        fontSize: 14,
        marginBottom: 10,
    },
    resultDetailsButtonText: {
        color: '#1c9a8e',
        fontWeight: '600',
    },
});

export default ResultsSection;
