import * as React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function Background() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
      }}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F6E8C3', '#D8BBE2']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
    </View>
  );
}