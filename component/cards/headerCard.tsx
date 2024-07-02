import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { List } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import { images } from "constants/paths";

const HeaderSection = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handlePress = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Upload your Retinal Image</Text>
                    <Text style={styles.headerSubText}>Submit your retinal image for a quick and accurate assessment</Text>
                </View>

                <List.Accordion
                    title="Show Sample Images"
                    titleStyle={styles.accordionTitle}
                    style={styles.accordion}
                    expanded={isAccordionOpen}
                    onPress={handlePress}
                >
                    {isAccordionOpen && (
                        <Animatable.View animation="fadeIn" duration={300} style={styles.accordionContent}>
                            <View style={styles.sampleImagesWrapper}>
                                <Image source={images.sample1} style={styles.sampleImage} />
                                <Image source={images.sample2} style={styles.sampleImage} />
                            </View>
                        </Animatable.View>
                    )}
                </List.Accordion>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f4f8', // Light grey background for the entire container
    },
    card: {
        backgroundColor: '#ffffff', // White background for the card
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    headerContainer: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1c9a8e', // Main theme color
        textAlign: 'center',
        marginBottom: 5,
    },
    headerSubText: {
        fontSize: 14,
        color: '#3a3a3a', // Dark grey color for subtext
        textAlign: 'center',
    },
    accordion: {
        backgroundColor: '#e7f7f5', // Light shade of the main theme color
        borderRadius: 8,
        marginTop: 10,
    },
    accordionTitle: {
        color: '#1c9a8e', // Main theme color
        fontSize: 16,
        fontWeight: '500',
    },
    accordionContent: {
        padding: 10,
        backgroundColor: '#ffffff', // White background for the accordion content
    },
    sampleImagesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sampleImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc', // Light grey border color
    },
});

export default HeaderSection;
