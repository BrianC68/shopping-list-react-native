import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { FontAwesome5 } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

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
  error: ({ text1, props, ...rest }) => (
    <View style={styles.errorToast}>
      <View style={styles.innerErrorToast}>
        <View style={styles.icon}><FontAwesome5 name="exclamation-circle" size={24} color='red' /></View>
        <Text style={styles.errorToastText}>{text1}</Text>
        {/* <Text>{text2}</Text> */}
      </View>
    </View>
  ),
  // any_custom_type: () => {}
};

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    }
  }
});

const setListShareChannel = async () => await Notifications.setNotificationChannelAsync('sh@ppingListShare', {
  name: 'listShare',
  importance: 'DEFAULT',
  // Optional attributes
  bypassDnd: false,
  description: 'Notify the user when a list is shared with the user',
  // groupId: string | null,
  // lightColor: string,
  lockscreenVisibility: 'PUBLIC',
  // showBadge: boolean,
  sound: 'true',
  // audioAttributes: Partial<AudioAttributes>,
  vibrationPattern: [1, 1],
  // enableLights: boolean,
  enableVibrate: true,
});
if (Platform.OS === 'android') {
  setListShareChannel();
}

const setShoppingListChannel = async () => await Notifications.setNotificationChannelAsync('sh@ppingList', {
  name: 'sh@ppingList',
  importance: 'DEFAULT',
  // Optional attributes
  bypassDnd: false,
  description: 'Notify the user when an item is added or updated on the list',
  // groupId: string | null,
  // lightColor: string,
  lockscreenVisibility: 'PUBLIC',
  // showBadge: boolean,
  sound: 'true',
  // audioAttributes: Partial<AudioAttributes>,
  vibrationPattern: [1, 1],
  // enableLights: boolean,
  enableVibrate: true,
});

if (Platform.OS === 'android') {
  setShoppingListChannel();
}

const getChannels = async () => {
  const channels = await Notifications.getNotificationChannelsAsync();
}

getChannels();

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

  // useEffect(() => { //
  //   const bgSubscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //     console.log('bgSubscription()')
  //     // Notifications.dismissAllNotificationsAsync();
  //   });

  //   const fgSubscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification.request.identifier);
  //     console.log('fgSubscription()')
  //   });

  //   return () => {
  //     bgSubscription.remove();
  //     fgSubscription.remove();
  //   }
  // }, []);

  const hideSplashScreen = async () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000)
  };

  if (!fontLoaded) {
    return (
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
  },
  errorToast: {
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
  innerErrorToast: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.indigoDark,
    minHeight: 60,
    width: 240,
    borderRadius: 10,
    paddingRight: 5,
  },
  errorToastText: {
    fontFamily: 'lato-bold',
    color: 'red',
    width: '80%'
  },
})
