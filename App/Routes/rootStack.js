import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator, HeaderBackButton } from '@react-navigation/native-stack';

import ORoomMangage from './app/RoomManageO.js';
import RoomDetailO from './app/RoomDetail.js';
import RoomItem from './app/Item';
const Stack = createNativeStackNavigator();
const RootStack =() => {

  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F6E8C3',
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.35,
          shadowRadius: 3.84,
        },
      }}
      >
        <Stack.Screen 
          name="ORoomMangage" 
          component={ORoomMangage}
          options={({ navigation, route }) => ({
          title: 'Quản lý phòng',
          headerRight: () => (
            <Ionicons
              name={'add-circle-outline'}
              size={25}
              style={{ marginRight: 15 }}
            />
          ),
        })}
        />
        <Stack.Screen 
          name="RoomDetailO" 
          component={RoomDetailO}
          options={() => ({
          title: 'Thông tin phòng',
          headerRight: () => (
            <Ionicons
              name={'add-circle-outline'}
              size={25}
              style={{ marginRight: 15 }}
            />
          ),
        })}
        />
        <Stack.Screen 
          name="RoomItem" 
          component={RoomItem}
        />
      </Stack.Navigator>
  );
}

export default RootStack;
