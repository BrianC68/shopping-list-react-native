import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Colors from '../../constants/Colors';

const ShoppingListsItem = ({ id, name, listOwner, user, onSelect }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <TouchableComponent
        activeOpacity={0.7}
        useForeground
        onPress={onSelect}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.listTitle}>{name} {listOwner !== user && `(${listOwner})`}</Text>
        </View>
      </TouchableComponent>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.indigo,
    padding: 20,

  },
  listTitle: {
    color: 'white',
    fontFamily: 'lato-bold',
    fontSize: 18,
  }
});

export default ShoppingListsItem;
