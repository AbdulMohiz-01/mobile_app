import React, { useState } from "react";
import { Alert, Modal as Modals,Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "constants/theme";
import { PrimaryButton, Input } from "component";

const Modal= ({
    text,
    oktext,
    dismisstext,
    okClick,
    dismissClick,
    width
}) => {
    const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
    <Modals
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Input
          value={""}
          onChangeText={() => {}}
          placeholder={text}
          //beforeIcon="email"
        />
          <PrimaryButton text={dismisstext} onClick={() => setModalVisible(dismissClick)} width={width} />
          <PrimaryButton text={oktext} onClick={() => setModalVisible(okClick)} width={width} />
        </View>
      </View>
    </Modals>
  </View>
);
};

const styles = StyleSheet.create({
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
});
export default Modal;