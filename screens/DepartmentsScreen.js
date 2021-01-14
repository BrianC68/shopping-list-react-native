import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import DepartmentItem from '../components/list/DepartmentItem';
import ModalComponent from '../components/UI/ModalComponent';
import AddNewDeptModalContent from '../components/list/AddNewDeptModalContent';

const DepartmentScreen = ({ currentList }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const departments = currentList.departments;

  const emptyList = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.headerText}>You can add a new department here or add one when you are adding items to your list.</Text>
      </View>
    )
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addDeptModal = (
    <ModalComponent
      visible={modalVisible}
      modalContent={<AddNewDeptModalContent closeModal={toggleModal} />}
      // onRequestClose={() => { }}
      title='Add New Department'
      onClose={toggleModal}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <View style={styles.headerDept}>
            <Text style={styles.headerText}>
              Department
            </Text>
            <TouchableOpacity style={styles.icon} onPress={toggleModal}>
              <FontAwesome5 name='plus' size={18} color={Colors.indigoDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>
        {departments.length === 0 && emptyList()}
        <FlatList
          data={departments}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
            <DepartmentItem
              added_by={itemData.item.added_by}
              deptID={itemData.item.id}
              deptName={itemData.item.name}
              shoppingListID={itemData.item.shopping_list}
              userID={itemData.item.user}
            />
          )}
        />
        {addDeptModal}
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
    marginHorizontal: 5
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.indigoLight,
    padding: 5,
    height: 40,
  },
  headerDept: {
    flexDirection: 'row',
    width: '70%',
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
    paddingLeft: 15
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  }
});

const mapStateToProps = state => ({
  currentList: state.list.currentList,
})

export default connect(mapStateToProps)(DepartmentScreen);
