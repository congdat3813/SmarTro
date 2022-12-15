import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeableModal from "./SwipeableModal";

const PostInfo = ({ navigation, route: { params } }) => {
  const {item} = params;
  const [modalVisible, setModalVisible] = useState(false);
  const showToast = () => {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
  }
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
        navigation.pop()
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>
          </View>
          <Text style={styles.headerText}>Thông tin đăng phòng</Text>
        </View>
        <View style={styles.body}>
        <Text style={styles.header}>{item.title}</Text>

        <Image
        style={styles.largeImage}
        source={{
          uri: item.image,
        }}
      />  

          <View style={styles.infoTag}>
          <Text style={styles.detailInfo}>Địa chỉ: 162 Lê Quý Đôn, Tân Lập,
Đông Hòa, Dĩ An, Bình Dương</Text>
          <Text style={styles.detailInfo}>Ngày đăng: 20/11/2022</Text>
          <View style={{flexDirection: 'row'}}>
          <Image
        style={styles.smallImage}
        source={{
          uri: 'https://i.pinimg.com/originals/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg',
        }}
      />  
            <View>
              <Text style={styles.detailInfo}>Dương Bá Tình</Text>
              <Text style={styles.detailInfo}>Số điện thoại: 03030303</Text>
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailInfo}>Đánh giá: </Text>
              <FontAwesome name="star" size={24} color="#F2BF00" />
              <FontAwesome name="star" size={24} color="#F2BF00" />
              <FontAwesome name="star" size={24} color="#F2BF00" />
              <FontAwesome name="star-o" size={24} color="#F2BF00" />
              <FontAwesome name="star-o" size={24} color="#F2BF00" />
              </View>
            </View>
          </View>
          </View>
      
          <Text style={styles.header}>Mô tả</Text>

          <View style={styles.descriptionTag}>
            <Text style={{fontSize: 20}}>{item.description}</Text>
          </View>
          {/* <Pressable
      onPress={showToast}
        style={styles.button}>
          <Text style={{color: 'white', fontSize: 16,  fontWeight: 'bold'}}>Lưu bài đăng</Text>
        </Pressable> */}
        <SwipeableModal />
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
    width: "100%",
    backgroundColor: "#F6E8C3",
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: "flex-end",
    marginBottom: 15
  },
  headerBarTitle: {
    alignItems: "center",
    flexDirection: "row",
    // position: 'absolute',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "center",
    top: 45,
    marginBottom: 10,
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
    marginBottom: 20,
  },
  id: {
    color: "#0BA108",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 6,
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
  menu: {
    // alignItems: 'center',
  },
  seeAll: {
    color: "#660B8E",
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  yellowButton: {
    width: 140,
    height: 40,
    backgroundColor: "#F2BF00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  blueButton: {
    width: 120,
    height: 40,
    backgroundColor: "#071D92",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  redButton: {
    width: 80,
    height: 40,
    backgroundColor: "#BD0000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  yellowButtonOutline: {
    width: 140,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#F2BF00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  blueButtonOutline: {
    width: 120,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#071D92",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  redButtonOutline: {
    width: 80,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#BD0000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 10,
  },
  smallImage: {
    width: 90,
    height: 90,
    borderRadius: '60%',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#660B8E',
  },
  largeImage: {
    width: 370,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#660B8E',
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
    height: 200,
    backgroundColor: "white",
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
  descriptionTag: {
    width: 370,
    height: 110,
    backgroundColor: "white",
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginBottom: 15
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#660B8E",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default PostInfo;
