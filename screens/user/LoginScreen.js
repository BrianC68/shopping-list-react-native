import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { login, setAuthLoading, clearError } from '../../actions/authActions';

const LoginScreen = ({ login, setAuthLoading, clearError }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const message = useSelector(state => state.auth.message);
  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  const onLogin = () => {
    if (userName === '' || password === '') {
      Alert.alert('Error', 'Please enter a username and password!', [{ text: 'OK' }]);
    } else {
      clearError();
      const credentials = {
        username: userName,
        password: password
      }
      // console.log(credentials)
      login(credentials);
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
        <Text style={styles.heading}>Login</Text>
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
        {loading && Platform.OS === 'ios' &&
          <View>
            <ActivityIndicator size='small' color={Colors.indigo} />
          </View>
        }
        <View style={styles.form}>
          <Input
            label='UserName'
            value={userName}
            keyboardType='default'
            autoCorrect={false}
            returnKeyType='next'
            onChangeText={setUserName}
            autoCapitalize={'none'}
          />
          <Input
            label='Password'
            value={password}
            keyboardType='default'
            autoCorrect={false}
            returnKeyType='next'
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.btn}>
          <Button color={Colors.indigo} title='Login' onPress={onLogin} />
        </View>
      </KeyboardAvoidingView>
    </View >
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
    marginVertical: 5,
  },
  error: {
    color: 'red',
    fontFamily: 'lato-bold',
    fontSize: 16,
  }
});

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  setAuthLoading: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
}

export default connect(null, { login, setAuthLoading, clearError })(LoginScreen);
