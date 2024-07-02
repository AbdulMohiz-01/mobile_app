import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    wrapper: {
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,

    },
    uploadWrapper: {
        marginVertical: 20,
    },
    uploadButton: {
        backgroundColor: "#199a8e",
        padding: 12,
        borderRadius: 999,
        marginVertical: 30,
    },
    analysing: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inLineLoader: {
        position: 'absolute',
        left: 115,
    },
    uploadButtonText: {
        color: "#ffff",
        textAlign: "center",
    },
    instructionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    instructionWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // borderRightWidth: 1,
        // borderRightColor: "gray",
        paddingRight: 10,
    },
    instructionText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    instructionSubText: {
        color: "gray",
    },
    selectedImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    selectedImageWrapper: {
        position: 'relative',
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 999,
        // give little border shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    resultContainer: {
        // marginTop: 20,
    },
    resultWrapper: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    resultText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    resultSubText: {
        fontSize: 16,
        color: "gray",
    },
    resultDetails: {
        marginTop: 10,
    },
    resultDetailsText: {
        fontSize: 16,
        color: "gray",
        textAlign: "justify",

    },
    resultAttentionText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    resultDetailsHeading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    resultDetailsButtonText: {
        color: "#199a8e",
        fontSize: 16,
        textDecorationLine: "underline",
    },

    chartContainer: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#f5f5f5',
    },
    pieChartWrapper: {
        width: 200,
        height: 200,
        alignSelf: "center",
        padding: 20,
    },
    barChartWrapper: {
        width: 200,
        height: 200,
    },
    legendsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        gap: 20,
    },
    legend: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
    },
    legendValue: {
        fontSize: 12,
        color: "#C0C0C0",
    },
    legendRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
    },
    legendColorBar: {
        width: 20,
        height: 5,
        borderRadius: 999,
    },
    boldText: {
        fontWeight: "bold",
        color: "#07f49e",
    },
    nullclass: {
        color: "#C0C0C0",
    },
    xaiContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 20,
        marginBottom: 20,
        padding: 20,
        paddingTop: 0,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    xaiHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    xaiImageBorder: {
        borderRadius: 10,
    },
    xaiImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        padding: 20,
        borderRadius: 20,
        // give some elevation
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chartHeadingWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chartHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    chartButtonsContainer: {
        flexDirection: 'row',
    },
    chartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#fff',
        elevation: 3, // For shadow on Android
        shadowColor: '#000', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    activeChartButton: {
        backgroundColor: '#ddd',
    },
    chartButtonIcon: {
        width: 24,
        height: 24,
    },
    noteContainer: {
        flexDirection: 'row',
        backgroundColor: '#eaf4ff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    noteIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    noteTextContainer: {
        flex: 1,
    },
    noteHeading: {
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 5,
    },
    noteText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
    xaiImage1: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    invalidImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        paddingTop: 0,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },

    invalidImageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },




});