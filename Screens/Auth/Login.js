import { StyleSheet, Text, View, Image, TextInput, Button, Switch, Pressable } from 'react-native';
import React, {useState} from 'react';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { Link } from '@react-navigation/native';
import {
  useFonts,
  BeVietnam_700Bold,
} from '@expo-google-fonts/be-vietnam';

export default function Login({naivigation}) {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = usePasswordVisibility();
  // const handleSubmitPress = () => {
  //   setErrortext('');
  //   if (!userEmail) {
  //     alert('Please fill Email');
  //     return;
  //   }
  //   if (!userPassword) {
  //     alert('Please fill Password');
  //     return;
  //   }
  //   setLoading(true);
  //   let dataToSend = {email: userEmail, password: userPassword};
  //   let formBody = [];
  //   for (let key in dataToSend) {
  //     let encodedKey = encodeURIComponent(key);
  //     let encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   fetch('http://localhost:3000/api/user/login', {
  //     method: 'POST',
  //     body: formBody,
  //     headers: {
  //       //Header Defination
  //       'Content-Type':
  //       'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === 'success') {
  //         AsyncStorage.setItem('user_id', responseJson.data.email);
  //         console.log(responseJson.data.email);
  //         navigation.replace('DrawerNavigationRoutes');
  //       } else {
  //         setErrortext(responseJson.msg);
  //         console.log('Please check your email id or password');
  //       }
  //     })
  //     .catch((error) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };

  return (
    // <LinearGradient colors={["#F6E8C3", "#D8BBE2"]} style={styles.linearGradient}>
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={require('../../assets/images/Logo.png')}
        />
        <Text style={styles.text}>Chào mừng bạn đến với SmartTro</Text>
        <View style={{top: 50}}>
          <Text style={styles.text1}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên đăng nhâp hoặc số điện thoại"
            onChangeText={(UserName) =>
              setUserName(UserName)
            }
          />
        </View>
        <View style={{top: 50}}>
          <Text style={styles.text1}>Mật khẩu</Text>
          <View style={styles.inputContainer}>
            <TextInput
                style={{width:'90%'}}
                placeholder="Nhập mật khẩu"
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                secureTextEntry={passwordVisibility}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
            </Pressable>
          </View>
        </View>
        <View style={styles.guide}>
          <View style={styles.remeberAccount}>
            <Switch
              style={styles.toggle}
              trackColor={{ false: "#FFFFFF", true: "#660B8E" }}
              thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#FFFFFF"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />  
            <Text style={{fontSize:12}}>Ghi nhớ đăng nhập</Text>
          </View>
          <Link style={{fontSize:12}} to={{ screen: 'ForgotPassword'}}>
            Quên mật khẩu ?
          </Link>
        </View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textBut}>Đăng nhập</Text>
        </Pressable>
        <View style={styles.register}>
          <Text style={{fontSize:12, marginRight: 10}}>Bạn chưa có tài khoản?</Text>
          <Link style={{fontSize:12}} to={{ screen: 'Register' }}>
            Đăng ký ngay
          </Link>
        </View>
      </View>
    // {/* </LinearGradient> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
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
    top: 100,
  },
  text: {
    position: 'absolute',
    width: 'auto',
    height: 36,
    top: 240,
    // fontFamily: 'BeVietnam_700Bold',
    fontSize: 24,
    lineHeight: 30,
    color: '#1A1A1A',
  },  
  text1: {  
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    width: 345,
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: 345,
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  toggle: {
    borderWidth: 1,
    marginRight: 20,
  },
  guide: {
    top: 60,
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
  },
  remeberAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  button: {
    width: 345,
    height: 50,
    top: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#660B8E',
    borderRadius: 10,
    borderWidth: 1,
  },
  textBut: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  register: {
    top: 120,  
    flexDirection: 'row',
  },
});