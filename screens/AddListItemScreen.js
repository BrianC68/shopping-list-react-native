import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Button, Alert,
  ScrollView, Switch, TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

import Input from '../components/UI/Input';
import ModalComponent from '../components/UI/ModalComponent';
import AddNewDeptModalContent from '../components/list/AddNewDeptModalContent';
import PushNotificationsHelpModalContent from '../components/list/PushNotificationsHelpModalContent';
import Colors from '../constants/Colors';
import { addItem, setLoading, setNewDepartment } from '../actions/listActions';

const AddListItemScreen = ({ currentListID, shares, departments, userID, addItem, setLoading, error, setNewDepartment, newDept }) => {
  const [itemDesc, setItemDesc] = useState('');
  const [quantity, setQuantity] = useState('');
  const [department, setDepartment] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pushModalVisible, setPushModalVisible] = useState(false);
  const [sendNotifications, setSendNotifications] = useState(false);

  const toggleNotifications = () => setSendNotifications(previousState => !previousState);

  const onAddItem = () => {
    if (itemDesc === '') {
      Alert.alert('Error', 'Item Description is required!', [{ text: 'OK' }]);
      return;
    } else if (quantity === '') {
      Alert.alert('Error', 'Quanitity is required!', [{ text: 'OK' }]);
      return;
    }

    const newItem = {
      user: userID,
      shopping_list: currentListID,
      item: itemDesc,
      quantity: quantity,
      department: department ? department : null,
      notifications: sendNotifications,
    }
    const msg = `${itemDesc} has been added to your list`;
    setLoading(true);
    addItem(newItem, msg);
    setItemDesc('');
    setQuantity('');
    setDepartment(0);
    setNewDepartment(false);
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const togglePushModal = () => {
    setPushModalVisible(!pushModalVisible);
  };

  const quantityInputHandler = quantity => {
    setQuantity(quantity.replace(/[^0-9]/g, '')); // This will prevent entering non-numeric chars from number keyboard
  }

  const addDeptModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={<AddNewDeptModalContent closeModal={toggleModal} />}
      // onRequestClose={() => { }}
      title='Add New Department'
      onClose={toggleModal}
    />
  );

  const pushNotificationsModal = (
    <ModalComponent
      visible={pushModalVisible}
      modalContent={<PushNotificationsHelpModalContent />}
      title='Push Notifications'
      onClose={togglePushModal}
    />
  );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.header}>Add List Item</Text>
        <View style={styles.form}>
          {shares.length > 0 &&
            <View style={styles.notifications}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text style={styles.notificationsText}>
                    Send Notifications
              </Text>
                </View>
                <TouchableOpacity style={{ paddingLeft: 10 }} onPress={togglePushModal}>
                  <FontAwesome5 name='question-circle' size={23} color={Colors.amberDark} />
                </TouchableOpacity>
              </View>
              <View>
                <Switch
                  trackColor={{ false: Colors.indigoLight, true: Colors.indigo }}
                  thumbColor={sendNotifications ? Colors.amberDark : Colors.amberLight}
                  ios_backgroundColor={Colors.indigoLight}
                  onValueChange={toggleNotifications}
                  value={sendNotifications}
                />
              </View>
            </View>
          }
          <Input
            label='Item Description'
            value={itemDesc}
            keyboardType='default'
            autoCorrect={true}
            onChangeText={setItemDesc}
            autoCapitalize={'words'}
          />
          <Input
            label='Quantity'
            value={quantity}
            keyboardType='number-pad'
            onChangeText={quantityInputHandler}
          />
          <Picker
            style={styles.picker}
            selectedValue={department}
            mode='dialog' // Default
            dropdownIconColor={Colors.indigo}
            onValueChange={(itemValue, itemIndex) => setDepartment(newDept ? departments[0].id : itemValue)}
          >
            <Picker.Item label='Select Department (Optional)' value={0} />
            {departments.map(dept => <Picker.Item label={dept.name} value={dept.id} key={dept.id} />)}
          </Picker>
          <View style={styles.button}>
            <Button title='Add New Department' color={Colors.amberDark} onPress={() => { toggleModal(); }} />
          </View>
          <View style={styles.button}>
            <Button title='Submit' color={Colors.indigo} onPress={onAddItem} />
          </View>
        </View>
        {error === 'The fields user, item, shopping_list must make a unique set.' &&
          <View style={styles.error}>
            <Text style={styles.errorText}>This item is already on your list!  Check your saved items tab.</Text>
          </View>
        }
      </View>
      {addDeptModal}
      {pushNotificationsModal}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    color: Colors.indigoDark,
    marginBottom: 20,
  },
  form: {
    width: '90%'
  },
  notifications: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notificationsText: {
    fontFamily: 'lato-bold',
    color: Colors.indigoDark,
  },
  picker: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  message: {
    marginVertical: 30,
    backgroundColor: Colors.indigoLight,
    padding: 20,
    borderRadius: 2,
    width: '90%'
  },
  messageText: {
    color: Colors.indigo,
    fontFamily: 'lato-bold',
  },
  error: {
    marginVertical: 30,
    // backgroundColor: Colors.indigoLight,
    padding: 20,
    borderRadius: 2,
    width: '90%'
  },
  errorText: {
    color: 'red',
    fontFamily: 'lato-bold',
  },
});

const mapStateToProps = state => ({
  currentListID: state.list.currentList.id,
  departments: state.list.currentList.departments,
  userID: state.auth.user.id,
  error: state.list.error,
  newDept: state.list.newDept,
  shares: state.list.currentList.shares,
});

AddListItemScreen.propTypes = {
  addItem: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setNewDepartment: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { addItem, setLoading, setNewDepartment })(AddListItemScreen);
