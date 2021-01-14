import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';

const ModalComponent = props => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.visible}
      modalContent={props.content}
    >
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            <View style={styles.modalContent}>
              {props.modalContent}
            </View>
            <View style={styles.btnContainer}>
              <Button
                title='Close'
                onPress={props.onClose}
                color={Colors.amberDark}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.indigoLight,
    // opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: Platform.OS === 'android' ? 'white' : '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '85%',
  },
  modalTitle: {
    color: Colors.indigo,
    fontFamily: 'roboto-bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContent: {
    width: '80%',
    marginBottom: 20,
  },
  btnContainer: {
    width: '80%'
  },
})

export default ModalComponent;
