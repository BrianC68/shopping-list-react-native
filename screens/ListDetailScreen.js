import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-message';

import Colors from '../constants/Colors';
import CurrentListItem from '../components/list/CurrentListItem';
import { setLoading, deleteList, clearListsMessage, setSortOrder, sortList, clearListsError, getList } from '../actions/listActions';
import HeaderButton from '../components/UI/HeaderButton';
import ModalComponent from '../components/UI/ModalComponent';
import ShareListModalContent from '../components/list/ShareListModalContent';

const ListDetailScreen = ({ currentList, setLoading, deleteList, navigation, user, message,
  clearListsMessage, setSortOrder, sortList, sortOrder, clearListsError, getList }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const error = useSelector(state => state.list.error);

  const itemsOnCurrentList = currentList.list_items.filter(item => item.on_list);

  // useEffect(() => {
  if (error === 'User does not exist!') {
    Toast.show({
      type: 'error',
      text1: error,
      topOffset: 150,
      visibilityTime: 4000,
      onHide: () => { clearListsError() },
    });
  }
  // }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      clearListsMessage();
    })
    return () => {
      unsubscribe;
    }
  }, [navigation])

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (message !== '') {
      Toast.show({
        type: 'info',
        text1: message,
        topOffset: 150,
        visibilityTime: 2000,
      });
    };
  }, [message])


  useEffect(() => {
    if (user === currentList.user) {
      navigation.dangerouslyGetParent().setOptions({
        headerRight: (() =>
          <HeaderButtons
            HeaderButtonComponent={HeaderButton}
          >
            <Item
              title='Share'
              iconName={'user-plus'}
              onPress={() => toggleModal()}
            />
            <Item
              title='Delete'
              iconName={'trash'}
              onPress={() => {
                Alert.alert(
                  'Warning',
                  'This shopping list and ALL ITEMS will be permanently removed!',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    {
                      text: 'Proceed',
                      style: 'destructive',
                      onPress: () => proceedWithDeletion()
                    }
                  ]
                )
              }}
            />
          </HeaderButtons>
        ),
      })
    }
  }, [navigation]);

  const proceedWithDeletion = () => {
    setLoading(true);
    deleteList(currentList.id);
    navigation.navigate('ShoppingLists');
  };

  // Add department name to each item in the array
  itemsOnCurrentList.forEach(function (item) {
    if (item.department === null) {
      item.deptName = 'None';
    } else {
      item.deptName = currentList.departments.find(dept => dept.id === item.department).name;
    }
  });

  const emptyList = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.headerText}>
          There are no items on your list.  Add a new item on the Add Item tab below
          or add items from the Saved Items tab below.
          </Text>
      </View>
    )
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const shareListModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={
        <ShareListModalContent
          user={user}
          listID={currentList.id}
          listName={currentList.name}
          listShares={currentList.shares}
          closeModal={toggleModal}
        />
      }
      title='Share List'
      onClose={toggleModal}
    />
  );

  const onSortList = (sortBy) => {
    if (sortBy === 'item' && sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
    sortList(sortBy);
  };

  const reLoadList = async () => {
    setIsRefreshing(true);
    await getList(currentList.id);
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Item</Text>
            <TouchableOpacity style={styles.icon} onPress={() => onSortList('item')}>
              <FontAwesome5 name='sort' size={20} color={Colors.indigoDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerQty}>
            <Text style={styles.headerText}>Qty</Text>
          </View>
          <View style={styles.headerDept}>
            <Text style={styles.headerText}>Dept</Text>
            <TouchableOpacity style={styles.icon} onPress={() => onSortList('dept')}>
              <FontAwesome5 name='object-group' size={20} color={Colors.indigoDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>
        {itemsOnCurrentList.length === 0 && emptyList()}
        <FlatList
          onRefresh={reLoadList}
          refreshing={isRefreshing}
          data={itemsOnCurrentList}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
            <CurrentListItem
              itemID={itemData.item.id}
              user={itemData.item.user}
              added_by={itemData.item.added_by}
              deptID={itemData.item.department}
              deptName={itemData.item.deptName}
              listID={currentList.id}
              item={itemData.item.item}
              quantity={itemData.item.quantity}
            />
          )}
        />
        {shareListModal}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 5,
    // paddingBottom: 20, // I don't like this look
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.indigoLight,
    padding: 5,
    height: 40
  },
  headerItem: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center'
  },
  headerQty: {
    width: '15%',
    alignItems: 'center',
  },
  headerDept: {
    flexDirection: 'row',
    width: '25%',
    alignItems: 'center',
  },
  headerActions: {
    width: '30%',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'lato-bold',
    fontSize: 14,
    color: Colors.indigoDark
  },
  icon: {
    paddingHorizontal: 10,
  },
  empty: {
    marginTop: Platform.OS === 'android' ? 100 : 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  }
});

ListDetailScreen.propTypes = {
  getList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  clearListsMessage: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  sortList: PropTypes.func.isRequired,
  clearListsError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentList: state.list.currentList,
  message: state.list.message,
  user: state.auth.user.id,
  sortOrder: state.list.sort_order,
  // error: state.list.error,
})

export default connect(mapStateToProps, {
  getList,
  setLoading,
  deleteList,
  clearListsMessage,
  setSortOrder,
  sortList,
  clearListsError,
})(ListDetailScreen);
