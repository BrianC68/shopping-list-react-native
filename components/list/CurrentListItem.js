import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import Colors from '../../constants/Colors';
import ModalComponent from '../UI/ModalComponent';
import EditCurrentListItemModalContent from '../list/EditCurrentListItemModalContent';
import { removeItemFromList, setLoading } from '../../actions/listActions';

const CurrentListItem = ({ itemID, user, added_by, deptID, deptName, item, quantity, listID, removeItemFromList, setLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showAddedByToast = () => {
    Toast.show({
      type: 'info',
      text1: `${item} was added by ${added_by}`,
      topOffset: 150, // default is 30
      visibilityTime: 1200,
    });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const updateItemModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={
        <EditCurrentListItemModalContent
          closeModal={toggleModal}
          itemID={itemID}
          user={user}
          deptID={deptID}
          listID={listID}
          item={item}
          quantity={quantity}
        />}
      // onRequestClose={() => { }}
      title='Update List Item'
      onClose={toggleModal}
    />
  );

  const onRemoveItemFromList = () => {
    const data = {
      user: user,
      shopping_list: listID,
      item: item,
      on_list: false,
    }
    setLoading(true);
    removeItemFromList(data, itemID);
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
        <TouchableOpacity onPress={showAddedByToast}>
          <FontAwesome5 name='user' size={23} color={Colors.indigo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { toggleModal(); }}>
          <FontAwesome5 name='edit' size={23} color={Colors.amberDark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemoveItemFromList}>
          <FontAwesome5 name='check-square' size={23} color={Colors.green} />
        </TouchableOpacity>
      </View>
      {updateItemModal}
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
    // alignItems: 'center',
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

CurrentListItem.propTypes = {
  removeItemFromList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   loading: state.list.loading,
// });

export default connect(null, { removeItemFromList, setLoading })(CurrentListItem);
