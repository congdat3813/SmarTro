import { StyleSheet, Text, View, Image, TextInput, Button, Switch, Pressable, Modal, Alert } from 'react-native';
import React, {useState} from 'react';
import { Link } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function Register({navigation}) {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = usePasswordVisibility();
    const [modalVisible, setModalVisible] = useState(true);
    const [actionTriggered, setActionTriggered] = useState('');
    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/images/Logo.png')}
            />
            <View style={{marginTop: 50}}>
              <Text style={styles.text1}>Mật khẩu</Text>
              <View style={styles.inputContainer}>
                <TextInput
                    style={{width:'90%'}}
                    placeholder="Nhập mật khẩu"
                    // onChangeText={(UserPassword) =>
                    //   setUserPassword(UserPassword)
                    // }
                    secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
              </View>
            </View>
            <View>
              <Text style={styles.text1}>Xác nhận mật khẩu</Text>
              <View style={styles.inputContainer}>
                <TextInput
                    style={{width:'90%'}}
                    placeholder="Xác nhận mật khẩu"
                    // onChangeText={(UserPassword) =>
                    //   setUserPassword(UserPassword)
                    // }
                    secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textBut}>Xác nhận</Text>
            </Pressable>
            <Modal
                animationType="slide"
                presentationStyle="overFullScreen"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
              {actionTriggered === '' ? 
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Quên mật khẩu</Text>
                        <Text style={{margin: 20}}>Điền số điện thoại của bạn</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại"
                            keyboardType="numberic"
                            // onChangeText={(UserPhone) =>
                            //   setUserName(UserPhone)
                            // }
                        />
                        <Link style={{fontSize:12, marginBottom:50}} to={{ screen: 'Login'}}>
                            Quay lại đăng nhập
                        </Link>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            // onPress={() => setModalVisible(!modalVisible)}
                            onPress={() => {setActionTriggered('ACTION_2'); setModalVisible(true);}}
                        >
                        <Text style={styles.textStyle}>Gửi</Text>
                        </Pressable>
                        <View style={styles.register}>
                            <Text style={{fontSize:12, marginRight: 10}}>Bạn chưa có tài khoản?</Text>
                            <Link style={{fontSize:12}} to={{ screen: 'Register' }}>
                                Đăng ký ngay
                            </Link>
                        </View>
                    </View>
                </View> : 
                actionTriggered === 'ACTION_2' ?    
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Xác thực</Text>
                        <Text style={{margin: 10}}>Nhập mã xác thực</Text>
                        <OTPInputView
                            style={{width: '90%', height: 50, marginTop: 10,}}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.roundStyleBase}
                            codeInputHighlightStyle={styles.roundStyleHighLighted}
                        />
                        <View style={styles.register}>
                            <Text style={{fontSize:12, marginRight: 10}}>Nếu chưa nhận được mã?</Text>
                            <Link style={{fontSize:12}} to={{ screen: 'Login' }}>
                                Gửi lại mã
                            </Link>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Gửi</Text>
                        </Pressable>
                        <View style={styles.register}>
                            <Text style={{fontSize:12, marginRight: 10}}>Bạn chưa có tài khoản?</Text>
                            <Link style={{fontSize:12}} to={{ screen: 'Register' }}>
                                Đăng ký ngay
                            </Link>
                        </View>
                    </View>
                </View>:
              null}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(red)',
    alignItems: 'center',
    justifyContent: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: '100%',
    top: 170,
    height: '75%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  buttonClose: {
    backgroundColor: '#660B8E',
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  button: {
    width: 345,
    height: 50,
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
    margin: 20,
    marginBottom: 80,
    flexDirection: 'row',
  },  
  roundStyleBase: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  roundStyleHighLighted: {
    borderColor: "#660B8E",
  },
});