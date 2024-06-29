import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, onClose }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Invalid Image</Text>
                <Text style={styles.message}>
                    The image you uploaded is not a valid retinal image. Please upload a valid retinal image and try again.
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CustomAlert;
