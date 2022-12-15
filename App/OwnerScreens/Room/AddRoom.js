import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, Alert, TextInput } from "react-native";
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import SwipeableModal from "./SwipeableModal";
import Modal from "react-native-modal";
// import * as ImagePicker from 'expo-image-picker';
// import Button from "./Button";
// import ImageViewer from "./ImageViewer";

const AddRoom = ({ navigation }) => {
  const [room, setRoom] = useState('');
  const [area, setArea] = useState(0);
  const [price, setPrice] = useState(0);
  const [num, setNum] = useState(0);

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  };


  const SwipeableModal = () => {

    // onSubmit = () => alert(this.state.data);
    const [visible, setVisible] = useState(false);
  
      return (
        <Fragment>
          <Modal
            isVisible={visible}
            backdropOpacity={0.3}
            swipeDirection="left"
            onSwipeComplete={()=>setVisible(false)}
            onBackdropPress={()=>setVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalDescription}>
              Bạn có chắc muốn thêm phòng?
              </Text>
              <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={()=>{setVisible(false); postData('https://tintrott.cleverapps.io/api/room', { name: room, area: area, price: price, numOfTenants: num, userId: 1, sex: 'Nam/Nữ' });}}
              >
                
                  <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Đồng ý</Text>
                  
              </Pressable>
              <Pressable
                onPress={()=>setVisible(false)}
              >
                
                  <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Hủy</Text>
                  
              </Pressable>
              </View>
            </View>
          </Modal>
  
          <Pressable
          onPress={()=> {setVisible(true); }}
          style={styles.modalButton}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Thêm</Text>
          </Pressable>
        </Fragment>
      );
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const PlaceholderImage = require('../../../assets/logo.png');

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F6E8C3", "#D8BBE2"]}
        style={styles.linearGradient}
      >
        <View style={styles.headerBar}>
          <View style={styles.headerBarTitle}>
          <Pressable
      onPress={() => 
        navigation.navigate('Rooms')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>
    </View>
          <Text style={styles.headerText}>Thêm phòng</Text>
        </View>
        <View style={styles.body}>

        {/* <View style={styles.infoTag}>
        <Text style={styles.id}>#1234</Text>
        <View style={styles.title}>
            <Text style={styles.detailInfo}>Phòng</Text>
            <Text style={styles.price}>101</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Sự cố</Text>
            <Text style={styles.price}>Hỏng đèn</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Ngày báo cáo</Text>
            <Text style={styles.price}>01/01/2022</Text>
          </View>

            <Text style={styles.detailInfo}>Mô tả</Text>
            <Text style={styles.description}>Bóng đèn dài bị vỡ.</Text>

        </View> */}
        <Text style={styles.header}>Tên phòng</Text>

          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={(room) => setRoom(room)}
            value={room}
          />

<Text style={styles.header}>Diện tích</Text>

          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={(area) => setArea(area)}
            value={area}
          />

<Text style={styles.header}>Giá</Text>

          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={(price) => setPrice(price)}
            value={price}
          />

<Text style={styles.header}>Số người tối đa</Text>
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={(num) => setNum(num)}
            value={num}
          />

<Text style={styles.header}>Hình ảnh</Text>
{/* <View style={styles.imagePicker}>
<View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      </View>
    </View> */}

        <SwipeableModal onSubmit={onSubmit}/>


        {/* <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      /> */}

</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    borderRadius: 5,
    height: "100%",
    width: 400,
  },
  headerBar: {
    height: 80,
    width: '100%',
    backgroundColor: '#F6E8C3',
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  headerBarTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    top: 45,    
    marginBottom: 10
  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#660B8E",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  item: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  list: {
    width: "100%",
    marginBottom: 20
  },
  id: {
    color: "#BD0000",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  info: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  detailInfo: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontStyle: "italic",
  },
  description: {
    fontSize: 20,
    fontStyle: "italic",
    marginLeft: 30
  },
  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15
  },
  largeImage: {
    width: 370,
    height: 370,
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 15
  },
  infoTag: {
    justifyContent: "center",
    width: 370,
    height: 190,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#660B8E",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: 370,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 15,
    marginBottom: 20
  },
  yellowButton: {
    width: 135,
    height: 40,
    backgroundColor: "#F2BF00",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  blueButton: {
    width: 115,
    height: 40,
    backgroundColor: "#071D92",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  greenButton: {
    width: 90,
    height: 40,
    backgroundColor: "#0BA108",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowButtonOutline: {
    width: 135,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#F2BF00",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  blueButtonOutline: {
    width: 115,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#071D92",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  greenButtonOutline: {
    width: 90,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#0BA108",
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 10
  },
  dropdownSection: {
    zIndex: 10,
    borderWidth: 0,
    borderRadius: 16,
  },
  dropdown: {
    zIndex: 10,
    borderWidth: 0,
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6, 
    marginBottom: 20   
  },
  imagePicker: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex:1, 
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    marginVertical: 350
  },
  modalDescription: {
    // padding: 20,
    fontSize: 20,
    marginBottom: 20
  },
  modalButton: {
    width: 370,
    height: 50,
    backgroundColor: "#660B8E",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default AddRoom;
