import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import Input from '../UI/Input';
import { updateDepartment, setLoading } from '../../actions/listActions';

const EditDepartmentModalContent = ({ updateDepartment, setLoading, deptID, deptName, userID, listID, closeModal }) => {
  const [departmentName, setDepartmentName] = useState(deptName);

  const onUpdateDept = () => {
    const data = {
      id: deptID,
      name: departmentName,
      user: userID,
      shopping_list: listID,
    }
    // console.log(data);
    setLoading(true);
    updateDepartment(data);
    closeModal();
  };

  return (
    <View>
      <Input
        label='Department'
        value={departmentName}
        keyboardType='default'
        autoCorrect={true}
        returnKeyType='next'
        onChangeText={setDepartmentName}
        autoCapitalize={'words'}
      />
      <View style={{ marginTop: 20 }}>
        <Button title='Submit' color={Colors.indigo} onPress={onUpdateDept} />
      </View>
    </View>
  )
}

EditDepartmentModalContent.propTypes = {
  updateDepartment: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default connect(null, { updateDepartment, setLoading })(EditDepartmentModalContent);
