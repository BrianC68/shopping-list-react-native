import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_LOADED,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  SET_AUTH_LOADING
} from '../actions/types';

// const loadUserData = async () => {
//   return await AsyncStorage.getItem('userData');
// }
// const userData = loadUserData();

// if (!userData) {
//   console.log('No User Data!');
// }
// // const parsedUserData = JSON.parse(userData);
// const { token, user_id, username } = userData;

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
  error: null,
  message: '',
  loading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: {
          username: action.payload.userName,
          id: action.payload.userID,
        },
        isAuthenticated: true,
        error: '',
        loading: false
      }
    case LOGIN_SUCCESS:
      saveDataToStorage(action.payload.token, action.payload.user.id, action.payload.user.username);
      // localStorage.setItem('token', action.payload.token);
      // localStorage.setItem('username', action.payload.user.username);
      // localStorage.setItem('user_id', action.payload.user.id);
      return {
        ...state,
        ...action.payload,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
        message: 'You are now logged in!',
        loading: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
        },
        isAuthenticated: false,
        error: null,
        message: 'You may now log in to your account!',
        loading: false
      }
    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
        // error:
      }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        message: '',
        loading: false
      }
    case LOGOUT:
      AsyncStorage.removeItem('userData');
      // localStorage.removeItem('token');
      // localStorage.removeItem('username');
      // localStorage.removeItem('user_id');
      return {
        ...state,
        // token: null,
        isAuthenticated: false,
        // user: null,
        error: null,
        message: '',
        // loading: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: ''
      }
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

const saveDataToStorage = async (token, user_id, username) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(
      {
        token: token,
        user_id: user_id,
        username: username
      }
    )
    );
    // console.log(`AsyncStorage Ran!, ${token}, ${user_id}, ${username}`)
  } catch (err) {
    console.log(err);
  }
}

export default auth;
