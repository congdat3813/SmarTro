import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  // const [animating, setAnimating] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     AsyncStorage.getItem('user_id').then((value) =>
  //       navigation.replace(
  //         value === null ? 'Auth' : 'DrawerNavigationRoutes'
  //       ),
  //     );
  //   }, 5000);
  // }, []);

  return (
    <LinearGradient
        colors={["#F6E8C3", "#D8BBE2"]}
        style={styles.linearGradient}
      >
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={require('../../assets/images/Logo.png')}
        />
        <Text style={styles.text}>SmartTro</Text>
      </View>
    </LinearGradient>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(red, blue);',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  logo: {
    position: 'absolute',
    width: 255,
    height: 105,
    left: 65,
    top: 200,
  },
  text: {
    position: 'absolute',
    width: 126,
    height: 36,
    fontFamily: 'Be Vietnam Pro',
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 30,
    color: '#1A1A1A',
  },
});