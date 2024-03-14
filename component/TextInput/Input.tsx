import React from 'react';
import { View, TextInput as RNTextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons } from 'constants/paths';

interface TextInputProps {
    beforeIcon?: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    afterIcon?: string;
    isPassword?: boolean;
    isValid?: boolean;
    toggleSecureTextEntry?: () => void;
    onBlur?: () => void;
    width?: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChangeText, placeholder, secureTextEntry, beforeIcon, afterIcon, isValid, isPassword, toggleSecureTextEntry, onBlur }) => {
    return (
        <View style={[styles.inputContainer]}>
            {beforeIcon && value && isValid && icons[beforeIcon] ? (
                <Image source={icons[beforeIcon + "Typing"]} style={styles.iconLeft} />
            ) : beforeIcon && icons[beforeIcon] && <Image source={icons[beforeIcon]} style={styles.iconLeft} />
            }
            <RNTextInput
                style={[styles.inputText]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
            />
            {afterIcon && isPassword && icons[afterIcon] && (
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                    <Image source={icons[afterIcon]} style={styles.iconRight} />
                </TouchableOpacity>
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
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        flex: 1,
        height: 50,
        color: 'black',
        fontSize: 16,
        width: "100%",
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
