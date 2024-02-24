import React from 'react';
import { View, TextInput as RNTextInput, Image, StyleSheet } from 'react-native';

interface TextInputProps {
    beforeIcon?: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    afterIcon?: string;
}

const iconMapping: { [key: string]: any } = {
    email: require('assets/icons/email.png'),
    emailTyping: require('assets/icons/email-typing.png'),
    password: require('assets/icons/password.png'),
    passwordTyping: require('assets/icons/password-typing.png'),
    eye: require('assets/icons/icon-eye-slash.png'),
};

const TextInput: React.FC<TextInputProps> = ({ value, onChangeText, placeholder, secureTextEntry, beforeIcon, afterIcon }) => {

    return (
        <View style={styles.inputContainer}>
            {beforeIcon && value && iconMapping[beforeIcon] && (
                <Image source={iconMapping[beforeIcon + "Typing"]} style={styles.iconLeft} />
            )}
            {beforeIcon && !value && iconMapping[beforeIcon] && (
                <Image source={iconMapping[beforeIcon]} style={styles.iconLeft} />
            )}
            <RNTextInput
                style={styles.inputText}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
            {afterIcon && iconMapping[afterIcon] && (
                <Image source={iconMapping[afterIcon]} style={styles.iconRight} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "80%",
        backgroundColor: "#f2f2f2",
        borderColor: "#f2f2f2",
        borderWidth: 1,
        borderRadius: 20,
        height: 60,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        flex: 1,
        height: 50,
        color: 'black',
        fontSize: 16,
    },
    iconLeft: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    iconRight: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
});

export default TextInput;
