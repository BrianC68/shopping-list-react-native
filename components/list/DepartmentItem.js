import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import Colors from '../../constants/Colors';
import ModalComponent from '../UI/ModalComponent';
import EditDepartmentModalContent from './EditDepartmentModalContent';
import { deleteDepartment, setLoading } from '../../actions/listActions';

const SavedItemsItem = ({ added_by, deptID, deptName, shoppingListID, userID, deleteDepartment, setLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showAddedByToast = () => {
    Toast.show({
      type: 'info',
      text1: `${deptName} was added by ${added_by}`,
      topOffset: 150, // default is 30
      visibilityTime: 1200,
    });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const updateDeptModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={
        <EditDepartmentModalContent
          closeModal={toggleModal}
          deptID={deptID}
          deptName={deptName}
          userID={userID}
          listID={shoppingListID}
        />
      }
      title='Update Department'
      onClose={toggleModal}
    />
  );

  const onDeleteDept = () => {
    Alert.alert(
      'Warning!',
      'This will permanently remove this department! Any saved items assigned to this department will no longer be assigned a department.  Proceed?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Canceled!'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => proceed(),
        }
      ]
    )
    const proceed = () => {
      setLoading(true);
      deleteDepartment(deptID);
    }
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.dept}>
        <Text style={styles.itemText}>{deptName}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={showAddedByToast}>
          <FontAwesome5 name='user' size={23} color={Colors.indigo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <FontAwesome5 name='edit' size={23} color={Colors.amberDark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteDept}>
          <FontAwesome5 name='trash-alt' size={23} color='red' />
        </TouchableOpacity>
      </View>
      {updateDeptModal}
    </View>
  )
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.indigoLight,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  dept: {
    width: '70%',
  },
  actions: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'lato-regular',
    fontSize: 14,
    color: Colors.indigoDark
  },
});

SavedItemsItem.propTypes = {
  deleteDepartment: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default connect(null, { deleteDepartment, setLoading })(SavedItemsItem);
