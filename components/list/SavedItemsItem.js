import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { addSavedItem, deleteItem, setLoading } from '../../actions/listActions';

const SavedItemsItem = ({ itemID, user, deptID, deptName, item, quantity, listID, addSavedItem, deleteItem, setLoading }) => {
  const onAddSavedItem = () => {
    const data = {
      id: itemID,
      user: user,
      item: item,
      department: deptID,
      quantity: quantity,
      shopping_list: listID,
      on_list: true,
    }
    setLoading(true);
    addSavedItem(data);
    // console.log(data);
  };

  const onDeleteSavedItem = () => {
    // console.log('onDeleteSavedItem pressed!')
    Alert.alert(
      'Warning!',
      'This will permanently remove this item from your saved items!',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Canceled!'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => proceedWithDeleteItem(),
        }
      ]
    )
  };

  const proceedWithDeleteItem = () => {
    setLoading(true);
    deleteItem(itemID);
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
      <View style={styles.qty}>
        <Text style={styles.itemText}>{quantity}</Text>
      </View>
      <View style={styles.dept}>
        <Text style={styles.itemText}>{deptName}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onAddSavedItem}>
          <FontAwesome5 name='plus-square' size={23} color={Colors.indigo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteSavedItem}>
          <FontAwesome5 name='trash-alt' size={23} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.indigoLight,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  item: {
    width: '30%',
  },
  qty: {
    width: '15%',
    alignItems: 'center'
  },
  dept: {
    width: '25%',
  },
  actions: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'lato-regular',
    fontSize: 14,
    color: Colors.indigoDark
  },
});

SavedItemsItem.propTypes = {
  addSavedItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(null, { addSavedItem, deleteItem, setLoading })(SavedItemsItem);
