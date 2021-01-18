import React, { useContext } from 'react';
import { Platform, Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ShoppingListsScreen, { shoppingListsScreenOptions } from '../screens/ShoppingListsScreen';
import ListDetailScreen from '../screens/ListDetailScreen';
import AddListItemScreen from '../screens/AddListItemScreen';
import SavedItemsScreen from '../screens/SavedItemsScreen';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import LoginScreen from '../screens/user/LoginScreen';
import SignUpScreen from '../screens/user/SignUpScreen';
import CurrentListContext from '../context/currentListContext';
import Colors from '../constants/Colors';
import { logout } from '../actions/authActions';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.indigo : 'white',
  },
  headerTitleStyle: {
    fontFamily: 'roboto-bold',
    // fontSize: 18
  },
  headerBackTitleStyle: {
    fontFamily: 'roboto-regular',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.indigoDark,
};

const ShoppingListTabsNavigator =
  Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

export const ShoppingListTabs = () => {
  return (
    <ShoppingListTabsNavigator.Navigator
      tabBarOptions={{
        activeBackgroundColor: Colors.indigo,
        activeTintColor: 'white',
        labelStyle: {
          fontFamily: 'roboto-bold'
        }
      }}
      activeColor={'white'}
      inactiveColor={Colors.indigoDark}
    >
      <ShoppingListTabsNavigator.Screen
        name='List'
        component={ListDetailScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <FontAwesome5 name='list' color='white' size={23} />
            :
            <Ionicons name='ios-list' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.indigo,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>List</Text> : 'List',
        }}
      />
      <ShoppingListTabsNavigator.Screen
        name='Add Item'
        component={AddListItemScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <FontAwesome5 name='plus-square' color='white' size={23} />
            :
            <Ionicons name='ios-add' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.amberDark,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>Add Item</Text> : 'Add Item',
        }}
      />
      <ShoppingListTabsNavigator.Screen
        name='Saved Items'
        component={SavedItemsScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <FontAwesome5 name='save' color='white' size={23} />
            :
            <Ionicons name='ios-save' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.indigoDark,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>Saved Items</Text> : 'Saved Items',
        }}
      />
      <ShoppingListTabsNavigator.Screen
        name='Depts'
        component={DepartmentsScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <Ionicons name='file-tray-stacked' color='white' size={23} />
            :
            <Ionicons name='ios-file-tray-stacked' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.orangeDark,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>Departments</Text> : 'Departments',
        }}
      />
    </ShoppingListTabsNavigator.Navigator>
  )
}

const ShoppingListsStackNavigator = createStackNavigator();

export const ShoppingListsNavigator = () => {
  const currentListContext = useContext(CurrentListContext);

  const { currentListTitle } = currentListContext;

  return (
    <ShoppingListsStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <ShoppingListsStackNavigator.Screen
        name='ShoppingLists'
        component={ShoppingListsScreen}
        options={shoppingListsScreenOptions}
      />
      <ShoppingListsStackNavigator.Screen
        name='ListDetail'
        component={ShoppingListTabs}
        options={{
          headerTitle: currentListTitle.length > 16 ? currentListTitle.substring(0, 16) + '...' : currentListTitle,
        }}
      />
    </ShoppingListsStackNavigator.Navigator>
  )
};

const MenuDrawerNavigator = createDrawerNavigator();

export const AppDrawerNavigator = () => {
  const dispatch = useDispatch();

  return (
    <MenuDrawerNavigator.Navigator
      drawerStyle={{
        backgroundColor: Colors.indigoLight
      }}
      drawerContentOptions={{
        activeBackgroundColor: Colors.indigoLight,
        activeTintColor: Colors.indigo,
        labelStyle: { fontSize: 18, fontFamily: 'roboto-bold' }
      }}
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <DrawerItemList {...props} />
            <TouchableOpacity onPress={() => {
              dispatch(logout());
              props.navigation.closeDrawer();
            }}>
              <View style={{ flexDirection: 'row', paddingLeft: 18 }}>
                <FontAwesome5 name="sign-out-alt" size={24} color={Colors.amberDark} />
                <Text
                  style={{
                    fontFamily: 'roboto-bold',
                    fontSize: 18,
                    paddingLeft: 32,
                    color: Colors.indigo,
                  }}>
                  Logout
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }}
    >
      <MenuDrawerNavigator.Screen
        name='My Shopping Lists'
        component={ShoppingListsNavigator}
        options={{
          drawerIcon: props =>
            <FontAwesome5
              name='list'
              size={23}
              color={Colors.amberDark}
            />
        }}
      />
    </MenuDrawerNavigator.Navigator>
  )
};

const AuthTabsNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

export const AuthTabs = () => {
  return (
    <AuthTabsNavigator.Navigator
      tabBarOptions={{
        activeBackgroundColor: Colors.indigo,
        activeTintColor: 'white',
        labelStyle: {
          fontFamily: 'roboto-bold'
        }
      }}
      activeColor={'white'}
      inactiveColor={Colors.indigoDark}
      shifting={true}
    >
      <AuthTabsNavigator.Screen
        name='Login'
        component={LoginScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <Ionicons name='log-in' color='white' size={23} />
            :
            <Ionicons name='ios-log-in' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.indigo,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>Login</Text> : 'Login',
          defaultNavOptions,
        }}
      />
      <AuthTabsNavigator.Screen
        name='Register'
        component={SignUpScreen}
        options={{
          tabBarIcon: () => (Platform.OS === 'android' ?
            <FontAwesome5 name='user-alt' color='white' size={23} />
            :
            <FontAwesome5 name='user-alt' color={Colors.amberDark} size={23} />),
          tabBarColor: Colors.amberDark,
          tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'roboto-bold' }}>Register</Text> : 'Register',
        }}
      />
    </AuthTabsNavigator.Navigator>
  )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <AuthStackNavigator.Screen
        name='sh@ppinglist'
        component={AuthTabs}
      // options={}
      />
    </AuthStackNavigator.Navigator>
  )
}
