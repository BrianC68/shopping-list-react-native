import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { FontAwesome5 } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import store from './store';
import CurrentListState from './context/currentListState';
import Colors from './constants/Colors';

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
  })
};

const toastConfig = {
  info: ({ text1, props, ...rest }) => (
    <View style={styles.infoToast}>
      <View style={styles.innerInfoToast}>
        <View style={styles.icon}><FontAwesome5 name="info-circle" size={24} color={Colors.indigoLight} /></View>
        <Text style={styles.infoToastText}>{text1}</Text>
        {/* <Text>{text2}</Text> */}
      </View>
    </View>
  ),
  // error: () => {},
  // info: () => {},
  // any_custom_type: () => {}
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
      await fetchFonts();
      setFontLoaded(true);
      hideSplashScreen();
    }
    loadFonts();
  }, [fetchFonts, hideSplashScreen]);

  const hideSplashScreen = async () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000)
  };

  // const loadFonts = async () => {
  //   await fetchFonts();
  //   await SplashScreen.hideAsync();
  // }

  if (!fontLoaded) {
    return (
      // <AppLoading
      //   startAsync={fetchFonts}
      //   onFinish={() => {
      //     setFontLoaded(true);
      //   }}
      //   onError={(err) => console.log(err)}
      // />
      <Text></Text>
    )
  };

  return (
    <CurrentListState>
      <Provider store={store}>
        <AppNavigator />
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </CurrentListState>
  );
};

const styles = StyleSheet.create({
  infoToast: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 60,
    width: 250,
    backgroundColor: Colors.indigoLight,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowRadius: 8,
    shadowOpacity: .45,
    elevation: 15,
  },
  innerInfoToast: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.indigoDark,
    minHeight: 60,
    width: 240,
    borderRadius: 10,
    paddingRight: 5,

  },
  infoToastText: {
    fontFamily: 'lato-bold',
    color: Colors.indigoLight,
    width: '80%'
  },
  icon: {
    width: '20%',
    alignItems: 'center',
  }
})
