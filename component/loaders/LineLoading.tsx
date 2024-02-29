import React from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Loader = () => {
    const widthAnimation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const animation = Animated.timing(widthAnimation, {
            toValue: width,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        });

        const loopAnimation = Animated.loop(animation);

        loopAnimation.start();

        return () => {
            loopAnimation.stop();
        };
    }, [widthAnimation]);

    return (
        <View style={styles.loaderContainer}>
            <Animated.View
                style={[
                    styles.loader,
                    {
                        backgroundColor: '#0071e2',
                        width: widthAnimation,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        width: 130,
        height: 4,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        overflow: 'hidden',
    },
    loader: {
        height: '100%',
        borderRadius: 30,
    },
});

export default Loader;
