import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import RoomManageO from './App/OwnerScreens/RoomManage.js'
import RoomDetailO from './App/OwnerScreens/RoomDetailO'

export default function App() {
  return (
    <Router>
      <Scene key='root'>
        <Scene
          key = 'roomManageO'
          component = {RoomManageO}
          title = "Manage"
          hideNavBar = {true}
        />
        <Scene
          key = 'roomDetailO'
          component = {RoomDetailO}
          title = "RoomDetailOwner"
          hideNavBar = {true}
        />
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
