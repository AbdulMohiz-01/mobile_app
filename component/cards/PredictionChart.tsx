import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart, BarChart } from "react-native-gifted-charts";
import * as Animatable from 'react-native-animatable';
import { icons } from "constants/paths";

const PredictionsChart = ({ chartType, setChartType, pieChartData, barChartData, result, getPercentageOfPrediction }) => {
    // Convert bar chart data to percentage values
    const convertedBarChartData = barChartData.map(item => ({
        ...item,
        value: item.value * 100,
    }));

    return (
        <Animatable.View animation="fadeIn" duration={300} style={styles.chartContainer}>
            <LinearGradient
                colors={['#1c9a8e', '#16a085']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            >
                <View style={styles.chartHeadingWrapper}>
                    <Text style={styles.chartHeading}>Predictions Chart</Text>
                    <View style={styles.chartButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.chartButton, chartType === 'pie' && styles.activeChartButton]}
                            onPress={() => setChartType('pie')}
                        >
                            <Image source={icons.pieChart} style={styles.chartButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.chartButton, chartType === 'bar' && styles.activeChartButton]}
                            onPress={() => setChartType('bar')}
                        >
                            <Image source={icons.barChart} style={styles.chartButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                {chartType === 'pie' ? (
                    <View style={styles.pieChartWrapper}>
                        <PieChart data={pieChartData} radius={80} />
                    </View>
                ) : (
                    <View style={styles.barChartWrapper}>
                        <BarChart
                            data={convertedBarChartData}
                            barWidth={30}
                            noOfSections={4}
                            frontColor="lightgray"
                            isAnimated
                            hideRules
                            yAxisThickness={0}
                            xAxisThickness={0}
                            initialSpacing={20}
                        />
                    </View>
                )}
                <View style={styles.legendsWrapper}>
                    <View style={styles.legendItem}>
                        <Text style={[styles.legendColorBar, { backgroundColor: '#2ecc71' }]}></Text>
                        <Text style={styles.legend}>No Dr: </Text>
                        <Text style={[styles.legendValue, result.class === '0' ? styles.boldText : styles.nullclass]}>
                            {getPercentageOfPrediction(result.predictons[0])}
                        </Text>
                    </View>
                    <View style={styles.legendItem}>
                        <Text style={[styles.legendColorBar, { backgroundColor: '#f1c40f' }]}></Text>
                        <Text style={styles.legend}>Mild: </Text>
                        <Text style={[styles.legendValue, result.class === '1' ? styles.boldText : styles.nullclass]}>
                            {getPercentageOfPrediction(result.predictons[1])}
                        </Text>
                    </View>
                    <View style={styles.legendItem}>
                        <Text style={[styles.legendColorBar, { backgroundColor: '#e67e22' }]}></Text>
                        <Text style={styles.legend}>Moderate: </Text>
                        <Text style={[styles.legendValue, result.class === '2' ? styles.boldText : styles.nullclass]}>
                            {getPercentageOfPrediction(result.predictons[2])}
                        </Text>
                    </View>
                    <View style={styles.legendItem}>
                        <Text style={[styles.legendColorBar, { backgroundColor: '#e74c3c' }]}></Text>
                        <Text style={styles.legend}>Severe: </Text>
                        <Text style={[styles.legendValue, result.class === '3' ? styles.boldText : styles.nullclass]}>
                            {getPercentageOfPrediction(result.predictons[3])}
                        </Text>
                    </View>
                    <View style={styles.legendItem}>
                        <Text style={[styles.legendColorBar, { backgroundColor: '#c0392b' }]}></Text>
                        <Text style={styles.legend}>Proliferative: </Text>
                        <Text style={[styles.legendValue, result.class === '4' ? styles.boldText : styles.nullclass]}>
                            {getPercentageOfPrediction(result.predictons[4])}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    gradientBackground: {
        padding: 15,
        borderRadius: 10,
    },
    chartHeadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    chartHeading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },
    chartButtonsContainer: {
        flexDirection: 'row',
    },
    chartButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    activeChartButton: {
        backgroundColor: '#16a085',
    },
    chartButtonIcon: {
        width: 20,
        height: 20,
        // tintColor: '#16a085',
    },
    pieChartWrapper: {
        alignItems: 'center',
    },
    barChartWrapper: {
        alignItems: 'center',
    },
    legendsWrapper: {
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColorBar: {
        width: 20,
        height: 10,
        marginRight: 5,
    },
    legend: {
        fontSize: 14,
        color: '#ffffff',
    },
    legendValue: {
        fontSize: 14,
        color: '#ffffff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    nullclass: {
        opacity: 0.6,
    },
});

export default PredictionsChart;
