import React, { useState } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import Input from '../UI/Input';
import { addDepartment, setLoading } from '../../actions/listActions';

const AddNewDeptModalContent = ({ closeModal, addDepartment, setLoading, currentListID, userID }) => {
  const [deptName, setDeptName] = useState('');

  const onAddDept = () => {
    if (deptName === '') {
      Alert.alert('Error', 'Please enter a name for your list!', [{ text: 'OK' }]);
    } else {
      const newDept = {
        user: userID,
        name: deptName,
        shopping_list: currentListID,
      }
      setLoading(true);
      addDepartment(newDept);
      setDeptName('');
      closeModal();
    }
  };

  return (
    <ScrollView>
      <View>
        <Input
          label='Department Name'
          value={deptName}
          keyboardType='default'
          autoCorrect={true}
          returnKeyType='next'
          onChangeText={setDeptName}
          autoCapitalize={'words'}
        />
        <View style={{ marginTop: 20 }}>
          <Button title='Submit' color={Colors.indigo} onPress={onAddDept} />
        </View>
      </View>
    </ScrollView>
  )
}

AddNewDeptModalContent.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.user.id,
  currentListID: state.list.currentList.id,
});

export default connect(mapStateToProps, { addDepartment, setLoading })(AddNewDeptModalContent);
