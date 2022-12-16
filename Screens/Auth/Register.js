import { StyleSheet, Text, View, Image, TextInput, Button, Switch, Pressable, Modal, Alert, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import { Link } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';
import { LinearGradient } from "expo-linear-gradient";

export default function Register({navigation}) {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = usePasswordVisibility();
    const [modalVisible, setModalVisible] = useState(true);
    const [actionTriggered, setActionTriggered] = useState('');
    const [focus, setFocus] = useState(true);
    const OnChoose = (newfocus) => {
      setFocus(newfocus);
    }
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={["#F6E8C3", "#D8BBE2"]}
            style={styles.linear}
            />
            <Image 
                style={styles.logo}
                source={require('../../assets/images/Logo.png')}
            />
            <Text style={styles.text}>Đăng ký</Text>
            <ScrollView>
            <View style={{marginTop: 320}}>
              <Text style={styles.text1}>Tên đăng nhập</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đăng nhâp"
                // onChangeText={(UserName) =>
                //   setUserName(UserName)
                // }
              />
            </View>
            <View >
              <Text style={styles.text1}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại"
                // onChangeText={(UserPhone) =>
                //   setUserName(UserPhone)
                // }
              />
            </View>
            <View >
              <Text style={styles.text1}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ email"
                // onChangeText={(UserEmail) =>
                //   setUserName(UserEmail)
                // }
              />
            </View>
            <View>
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
            </ScrollView>
            <View style={{marginBottom: 10}}>
            <Pressable style={styles.button} onPress={() => {setActionTriggered('ACTION_2'); setModalVisible(true);}}>
              <Text style={styles.textBut}>Đăng ký</Text>
            </Pressable>
            </View>
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
                        <Text style={styles.modalText}>Chọn vai trò</Text>
                        <View style={styles.role}>
                        <TouchableOpacity onPress={() => OnChoose(true)}
                          style = {focus ? styles.Oactive: styles.OUnactive}
                        >
                          <View style={styles.selectRole}>
                            <MaterialCommunityIcons name={'account-edit'} size={70} color='#232323' />
                            <Text style={styles.textRole}>Chủ trọ</Text>
                          </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => OnChoose(false)}
                            style = {!focus ? styles.Oactive: styles.OUnactive}
                          >                          
                          <View style={styles.selectRole}>
                            <MaterialCommunityIcons name={'account-search'} size={70} color='#232323' />
                            <Text style={styles.textRole}>Khách thuê</Text>
                          </View>
                          </TouchableOpacity>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Tiếp theo</Text>
                        </Pressable>
                    </View>
                </View> : 
                actionTriggered === 'ACTION_2' ?    
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Chúc mừng bạn đã đăng kí thành công</Text>
                        <View style={styles.role}>
                          {
                            !focus?
                            <View style={styles.selectRole}>
                              <MaterialCommunityIcons name={'account-search'} size={70} color='#232323' />
                              <Text style={styles.textRole}>Khách thuê</Text>
                            </View>:
                            <View style={styles.selectRole}>
                              <MaterialCommunityIcons name={'account-edit'} size={70} color='#232323' />
                              <Text style={styles.textRole}>Chủ Trọ</Text>
                            </View>
                          }
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => navigation.navigate('Login')}
                        >
                        <Text style={styles.textStyle}>Quay lại đăng nhập</Text>
                        </Pressable>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    width: '100%',
    top: 170,
    height: '75%',
    margin: 20,
    backgroundColor: "white",
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
    alignItems: 'center',
    justifyContent: 'center',
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
  role: {
    flexDirection: 'row',
    marginBottom: 80,
    marginTop: 30,
  },
  selectRole: {
    alignItems: 'center',
    padding: 45,
  },
  textRole: {
    fontSize: 20,
    lineHeight: 50,
    letterSpacing: 0.25,
    textAlign: 'center',
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
  Oactive: {
    backgroundColor:'#D9D9D9',
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  OUnactive: {
    backgroundColor:'#FFFFFF',
    borderRadius: 15,
    borderColor:'#FFFFFF',
  },
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height,
  },
});