import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../constants/Colors';
import Input from '../UI/Input';
import { addNewList, setLoading } from '../../actions/listActions';

const AddNewListModalContent = ({ closeModal, addNewList, setLoading }) => {
  const [listName, setlistName] = useState('');
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        const { token, user_id, username } = userData;
        setUserID(user_id);
      } catch (err) {
        console.log(err);
      }
    }
    loadUserData();
  }, [setUserID]);

  const onAddList = () => {
    if (listName === '') {
      Alert.alert('Error', 'Please enter a name for your list!', [{ text: 'OK' }]);
    } else {
      const newList = {
        user: user_id,
        name: listName
      }
      addNewList(newList);
      setLoading(true);
      setlistName('');
      closeModal();
    }
  };

  return (
    <View>
      <Input
        label='List Name'
        value={listName}
        keyboardType='default'
        autoCorrect={true}
        returnKeyType='next'
        onChangeText={setlistName}
        autoCapitalize={'words'}
      />
      <View style={{ marginTop: 20 }}>
        <Button title='Submit' color={Colors.indigo} onPress={onAddList} />
      </View>
    </View>
  )
}

AddNewListModalContent.propTypes = {
  addNewList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(null, { addNewList, setLoading })(AddNewListModalContent);
