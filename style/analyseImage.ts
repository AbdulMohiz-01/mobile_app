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
    headerContainer: {
        marginVertical: 20,
        marginBottom: 0,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    headerSubText: {
        fontSize: 16,
        color: "gray",
    },
    sampleContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    sampleText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    sampleImagesWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    sampleImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        paddingTop: 0,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,

    },
    chartWrapper: {
        width: 200,
        height: 200,
        alignSelf: "center",
        padding: 20,
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
    },
    legendValue: {
        fontSize: 12,
        color: "gray",
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
        color: "black",
    },
    nullclass: {
        color: "gray",
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




});