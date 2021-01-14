import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Text,
  Platform,
  Alert
} from 'react-native';

import Input from '../../components/UI/Input';
import { register, setAuthLoading } from '../../actions/authActions';
import Colors from '../../constants/Colors';

const SignUpScreen = ({ register, setAuthLoading }) => {
  const [regUsername, setUserName] = useState('');
  const [regPassword, setPassword] = useState('');

  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);

  const onRegister = () => {
    if (regUsername === '' || regPassword === '') {
      Alert.alert('Error', 'Please enter a username and password!', [{ text: 'OK' }]);
    } else {
      const credentials = {
        username: regUsername,
        password: regPassword
      }
      register(credentials);
      setAuthLoading();
      setUserName('');
      setPassword('');
    }
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 40}
        style={styles.keyBoard}
      >
        <Text style={styles.heading}>Register</Text>
        {error &&
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        }
        {message !== '' &&
          <View>
            <Text style={styles.error}>{message}</Text>
          </View>
        }
        <View style={styles.form}>
          <Input
            label='UserName'
            value={regUsername}
            keyboardType='default'
            autoCorrect={false}
            returnKeyType='next'
            onChangeText={setUserName}
            autoCapitalize={'none'}
          />
          <Input
            label='Password'
            value={regPassword}
            keyboardType='default'
            autoCorrect={false}
            returnKeyType='next'
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.btn}>
          <Button color={Colors.indigo} title='Register' onPress={onRegister} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: Colors.amberDark,
    marginBottom: 20,
  },
  form: {
    width: '80%'
  },
  btn: {
    paddingVertical: 20,
    width: '60%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    marginVertical: 1,
  },
  error: {
    color: 'red',
    fontFamily: 'lato-bold',
    fontSize: 16,
  }
});

SignUpScreen.propTypes = {
  register: PropTypes.func.isRequired,
  setAuthLoading: PropTypes.func.isRequired,
}

export default connect(null, { register, setAuthLoading })(SignUpScreen);
