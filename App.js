import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import RootStack from './root';
import { LinearGradient } from 'expo-linear-gradient';
export default function App() {
  return (
    <>
    <LinearGradient colors={['#F6E8C3', '#D8BBE2']} style={styles.linear} />
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
    linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height,
  },
});