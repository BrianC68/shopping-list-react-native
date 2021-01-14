import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigator, AppDrawerNavigator } from './ShoppingListsNav';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { loadUser, setAuthLoading } from '../actions/authActions';
import { setLoading } from '../actions/listActions';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

const AppNavigator = ({ loadUser, setAuthLoading }) => {
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        const { token, user_id, username } = userData;
        setAuthTokenHeader(token);
        setAuthLoading();
        loadUser(user_id, username, token);
        // console.log(user_id, username, token);
      } catch (err) {
        // Do nothing app will redirect to AuthNavigator
      }
    }
    loadUserData();
  }, [AsyncStorage.getItem, loadUser, setAuthTokenHeader, setAuthLoading]);

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const authLoading = useSelector(state => state.auth.loading);
  const listLoading = useSelector(state => state.list.loading);
  // const message = useSelector(state => state.list.message);

  return (
    <NavigationContainer>
      {Platform.OS === 'android' &&
        <Spinner
          visible={authLoading}
          animation='fade'
          size='large'
          color={Colors.amberDark}
          overlayColor='rgba(197, 202, 233, .5)' // Colors.indigoLight
        />
      }
      {Platform.OS === 'android' &&
        <Spinner
          visible={listLoading}
          animation='fade'
          size='large'
          color={Colors.amberDark}
          overlayColor='rgba(197, 202, 233, .5)' // Colors.indigoLight
        />
      }
      {!isAuth && <AuthNavigator />}
      {isAuth && <AppDrawerNavigator />}
      {/* {isAuth && <ShoppingListsNavigator />} */}
      {Platform.OS === 'android' ? <StatusBar style='light' /> : <StatusBar style='dark' />}
    </NavigationContainer>
  )
};

AppNavigator.propTypes = {
  loadUser: PropTypes.func.isRequired,
  setAuthLoading: PropTypes.func.isRequired,
};

export default connect(null, { loadUser, setAuthLoading })(AppNavigator);
