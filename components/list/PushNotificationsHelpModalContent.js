import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const PushNotificationsHelpModalContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If push notifications are enabled, anyone who shares the list will
        receive a push notification if you add an item to the list.
      </Text>
      <Text style={styles.text}>
        This can be helpful when someone is at the store shopping!
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'lato-regular',
    color: Colors.indigoDark,
    fontSize: 18,
    marginVertical: 10,
  }
});

export default PushNotificationsHelpModalContent;
