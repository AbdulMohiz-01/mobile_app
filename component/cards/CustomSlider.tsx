import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomImageCompareSlider = ({ leftImageUri, rightImageUri }) => {
    const [sliderValue, setSliderValue] = useState(0.5);

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, { width: SCREEN_WIDTH * sliderValue }]}>
                <Image source={{ uri: leftImageUri }} style={styles.image} />
            </View>
            <View style={styles.imageContainerOverlay}>
                <Image source={{ uri: rightImageUri }} style={styles.image} />
            </View>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    thumbTintColor="#000"
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#000"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    imageContainer: {
        overflow: 'hidden',
    },
    imageContainerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    sliderContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        justifyContent: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default CustomImageCompareSlider;
