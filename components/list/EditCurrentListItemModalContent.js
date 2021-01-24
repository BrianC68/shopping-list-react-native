import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

import Colors from '../../constants/Colors';
import Input from '../UI/Input';
import { updateItem, setLoading } from '../../actions/listActions';

const EditCurrentListItemModalContent = (
  { closeModal,
    itemID,
    user,
    deptID,
    item,
    quantity,
    listID,
    departments,
    updateItem,
    setLoading, }) => {
  const [itemName, setItemName] = useState(item);
  const [itemQty, setItemQty] = useState(quantity.toString());
  const [department, setDepartment] = useState(deptID);

  const onUpdateItem = () => {
    if (itemName === '') {
      Alert.alert('Error', 'Item Description is required!', [{ text: 'OK' }]);
      return;
    } else if (itemQty === '') {
      Alert.alert('Error', 'Quanitity is required!', [{ text: 'OK' }]);
      return;
    }

    const data = {
      id: itemID,
      user: user,
      shopping_list: listID,
      on_list: true,
      notifications: false,
      // Can only update next three values
      item: itemName,
      quantity: itemQty,
      department: department,
    }
    setLoading(true);
    updateItem(data);
    closeModal();
  };

  const quantityInputHandler = itemQty => {
    setItemQty(itemQty.replace(/[^0-9]/g, '')); // This will prevent entering non-numeric chars from number keyboard
  };

  return (
    <View>
      <Input
        label='Item Name'
        value={itemName}
        keyboardType='default'
        autoCorrect={true}
        returnKeyType='next'
        onChangeText={setItemName}
        autoCapitalize={'words'}
      />
      <Input
        label='Quantity'
        value={itemQty}
        keyboardType='number-pad'
        onChangeText={quantityInputHandler}
      />
      <Picker
        style={styles.picker}
        selectedValue={department}
        mode='dialog' // Default
        dropdownIconColor={Colors.indigo}
        onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
      >
        <Picker.Item label='Select Department (Optional)' value={0} />
        {departments.map(dept => <Picker.Item label={dept.name} value={dept.id} key={dept.id} />)}
      </Picker>
      <View style={{ marginTop: Platform.OS === 'android' ? 20 : 0 }}>
        <Button title='Submit' color={Colors.indigo} onPress={onUpdateItem} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  picker: {
    marginTop: 10,
  }
});

EditCurrentListItemModalContent.propTypes = {
  updateItem: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  departments: state.list.currentList.departments,
});

export default connect(mapStateToProps, { updateItem, setLoading })(EditCurrentListItemModalContent);
