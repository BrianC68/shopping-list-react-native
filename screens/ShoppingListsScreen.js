import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import { getLists, setLoading, getList, clearCurrent } from '../actions/listActions';
import { savePushToken } from '../actions/authActions';
import ShoppingListsItem from '../components/list/ShoppingListsItem';
import ModalComponent from '../components/UI/ModalComponent';
import AddNewListModalContent from '../components/list/AddNewListModalContent';
import CurrentListContext from '../context/currentListContext';

const ShoppingListsScreen = ({ navigation, list: { lists, currentList, loading }, getLists, setLoading, getList, clearCurrent, username, userData, savePushToken }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentListContext = useContext(CurrentListContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setCurrentListTitle } = currentListContext;

  useEffect(() => {
    let pushToken;
    const getPermissionForNotifications = async () => {
      let permissionObject = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (permissionObject !== 'granted') {
        permissionObject = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      if (permissionObject.status !== 'granted') {
        pushToken = null;
      } else {
        pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      }
      // console.log(`ShoppingListsScreen pushToken: ${userData.push_token}`);
      const profileData = {
        user: userData.id,
        push_token: pushToken,
        id: userData.profile_id,
      }
      // console.log("savePushToken() ran!");
      // console.log(profileData);
      savePushToken(profileData);
    }
    getPermissionForNotifications();
  }, [savePushToken]);

  useEffect(() => {
    getLists();
    setLoading(false);
    // console.log(lists);
  }, [setLoading, getLists]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: (() =>
        <HeaderButtons
          HeaderButtonComponent={HeaderButton}
        >
          <Item
            title='Add List'
            iconName={'plus'}
            style={styles.headerButton}
            onPress={() => {
              toggleModal();
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: (() =>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Menu'
            iconName='bars'
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    })
  }, [])

  const onSelectList = async (id, name) => {
    clearCurrent(); // clears the current list from state
    setCurrentListTitle(name);
    setLoading(true);
    await getList(id);
    // console.log(currentList)
    if (currentList === null) {
      setLoading(false);
    }
    navigation.navigate('ListDetail', {
      params: {
        listID: id
      },
      screen: 'List',
    });
  }

  const addListModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={<AddNewListModalContent closeModal={toggleModal} />}
      onRequestClose={() => { }}
      title='Add New List'
      onClose={toggleModal}
    />
  );

  const reLoadLists = async () => {
    setIsRefreshing(true);
    await getLists();
    setIsRefreshing(false);
  }

  return (
    <View style={styles.backGround}>
      {loading && Platform.OS === 'ios' &&
        <View style={{ paddingTop: 20 }}>
          <ActivityIndicator color={Colors.amber} />
        </View>
      }
      <FlatList
        onRefresh={reLoadLists}
        refreshing={isRefreshing}
        data={lists}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData =>
          <ShoppingListsItem
            id={itemData.item.id}
            name={itemData.item.name}
            listOwner={itemData.item.list_owner}
            user={username}
            onSelect={() => {
              onSelectList(itemData.item.id, itemData.item.name);
            }}
          />
        }
      />
      {addListModal}
    </View>
  )
}

export const shoppingListsScreenOptions = {
  headerTitle: 'My Shopping Lists',
};

const styles = StyleSheet.create({
  noLists: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  text: {
    color: Colors.indigoDark,
  },
  backGround: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButton: {
    marginRight: 10,
  },
});

ShoppingListsScreen.propTypes = {
  getLists: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  savePushToken: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  list: state.list,
  username: state.auth.user.username,
  userData: state.auth.user,
})

export default connect(mapStateToProps, { getLists, setLoading, getList, clearCurrent, savePushToken })(ShoppingListsScreen);
