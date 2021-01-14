import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Alert,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Input from '../UI/Input';
import { setLoading, shareList } from '../../actions/listActions';

const ShareListModalContent = ({ closeModal, setLoading, shareList, user, listID, listName, listShares }) => {
  const [userName, setUserName] = useState('');

  const onShareList = () => {
    if (userName === '') {
      Alert.alert('Error', 'Please enter a username!', [{ text: 'OK' }]);
    } else {
      const data = {
        id: listID,
        user: user,
        name: listName,
        username: userName,
        action: ''
      }
      const message = `Your list has been shared with ${userName}`;
      setLoading(true);
      shareList(data, message);
      setUserName('');
      closeModal();
    }
  };

  const onUnShareList = (shareUserName) => {
    Alert.alert(
      'Warning',
      `This list will no longer be shared with ${shareUserName}`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          style: 'destructive',
          onPress: () => proceedWithUnShareList(shareUserName)
        }
      ]
    );
  };

  const proceedWithUnShareList = (shareUserName) => {
    const data = {
      id: listID,
      user: user,
      name: listName,
      username: shareUserName,
      action: 'remove'
    }

    const message = `You are no longer sharing with ${shareUserName}`;
    setLoading(true);
    shareList(data, message);
    // console.log(data, message)
    closeModal();
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {listShares.length !== 0 && <Text style={styles.text}>Shared with...</Text>}
      <View style={styles.shares}>
        {listShares.map(share => (
          <Pressable key={share.id} onPress={() => onUnShareList(share.username)}><Text style={styles.username}>{share.username}{' '}
            <FontAwesome5 name='trash-alt' size={20} color='red' /></Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.text}>
        Enter the username of the person with whom you want to share your list.  Please note
        that the user will have full access to your list, but will be unabled to share it or delete it.
        </Text>
      <Input
        // label='UserName'
        value={userName}
        keyboardType='default'
        returnKeyType='next'
        autoCapitalize='none'
        onChangeText={setUserName}
      />
      <View style={{ marginTop: 20, width: '100%' }}>
        <Button title='Submit' color={Colors.indigo} onPress={onShareList} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'lato-regular',
    color: Colors.indigo,
  },
  shares: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingVertical: 5,
    width: '100%'
  },
  username: {
    paddingVertical: 4,
    fontFamily: 'lato-regular',
    color: Colors.indigo
  }
});

ShareListModalContent.propTypes = {
  setLoading: PropTypes.func.isRequired,
  shareList: PropTypes.func.isRequired,
};

export default connect(null, { setLoading, shareList })(ShareListModalContent);
