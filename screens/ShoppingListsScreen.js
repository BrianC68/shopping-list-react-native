import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import { getLists, setLoading, getList, clearCurrent } from '../actions/listActions';
import ShoppingListsItem from '../components/list/ShoppingListsItem';
import ModalComponent from '../components/UI/ModalComponent';
import AddNewListModalContent from '../components/list/AddNewListModalContent';
import CurrentListContext from '../context/currentListContext';

const ShoppingListsScreen = ({ navigation, list: { lists, message }, getLists, setLoading, getList, clearCurrent, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentListContext = useContext(CurrentListContext);

  const { setCurrentListTitle } = currentListContext;

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

  // if (!lists || lists.length === 0) {
  //   return (
  //     <View style={styles.noLists}>
  //       <Text style={styles.text}>You have no lists, why not start one!</Text>
  //       {addListModal}
  //     </View>
  //   )
  // }

  return (
    <View style={styles.backGround}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData =>
          <ShoppingListsItem
            id={itemData.item.id}
            name={itemData.item.name}
            listOwner={itemData.item.list_owner}
            user={user}
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
  list: PropTypes.object.isRequired,
  error: PropTypes.object,
  message: PropTypes.string,
  // clearListsError: PropTypes.func.isRequired,
  // clearListsMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  list: state.list,
  user: state.auth.user.username,
  // loading: state.list.loading,
})

export default connect(mapStateToProps, { getLists, setLoading, getList, clearCurrent })(ShoppingListsScreen);
