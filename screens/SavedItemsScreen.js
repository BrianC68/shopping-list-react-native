import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';
import SavedItemsItem from '../components/list/SavedItemsItem';
import { sortList, setSortOrder } from '../actions/listActions';

const SavedItemsScreen = ({ currentList, sortList, setSortOrder, sortOrder }) => {
  const [sendNotifications, setSendNotifications] = useState(false);

  const toggleNotifications = () => setSendNotifications(previousState => !previousState);

  const savedItems = currentList.list_items.filter(item => !item.on_list);

  // Add department name to each item in the array
  savedItems.forEach(function (item) {
    if (item.department === null) {
      item.deptName = 'None';
    } else {
      item.deptName = currentList.departments.find(dept => dept.id === item.department).name;
    }
  });

  const emptyList = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.headerText}>Items you add to your list will automatically be saved and appear here.
        {'  '}Saved items that are currently on your list will not appear here until they are removed from your list.</Text>
      </View>
    )
  };

  const onSortList = (sortBy) => {
    if (sortBy === 'item' && sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
    sortList(sortBy);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        {currentList.shares.length > 0 &&
          <View style={styles.headerRow}>
            <Text style={styles.notificationsText}>
              Send Notifications
          </Text>
            <View>
              <Switch
                trackColor={{ false: Colors.indigoLight, true: Colors.indigo }}
                thumbColor={sendNotifications ? Colors.amberDark : Colors.amberLight}
                ios_backgroundColor={Colors.indigoLight}
                onValueChange={toggleNotifications}
                value={sendNotifications}
              />
            </View>
          </View>
        }
        <View style={styles.headerRow}>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Item</Text>
            <TouchableOpacity style={styles.icon} onPress={() => onSortList('item')}>
              <FontAwesome5 name='sort' size={23} color={Colors.amberDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerQty}>
            <Text style={styles.headerText}>Qty</Text>
          </View>
          <View style={styles.headerDept}>
            <Text style={styles.headerText}>Dept</Text>
            <TouchableOpacity style={styles.icon} onPress={() => onSortList('dept')}>
              <FontAwesome5 name='object-group' size={23} color={Colors.amberDark} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>
        {savedItems.length === 0 && emptyList()}
        <FlatList
          data={savedItems}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
            <SavedItemsItem
              itemID={itemData.item.id}
              user={itemData.item.user}
              deptID={itemData.item.department}
              deptName={itemData.item.deptName}
              item={itemData.item.item}
              quantity={itemData.item.quantity}
              listID={currentList.id}
              notifications={sendNotifications}
            />
          )}
        />
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
  notifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    paddingVertical: 10,
  },
  notificationsText: {
    fontFamily: 'lato-bold',
    color: Colors.indigoDark,
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
    color: Colors.indigoDark,
  },
  icon: {
    paddingHorizontal: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  }
});

SavedItemsScreen.propTypes = {
  sortList: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentList: state.list.currentList,
  sortOrder: state.list.sort_order,
});

export default connect(mapStateToProps, { sortList, setSortOrder })(SavedItemsScreen);
