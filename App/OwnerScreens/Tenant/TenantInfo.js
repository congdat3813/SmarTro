import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, Button, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeableModal from "./SwipeableModal";
import moment from 'moment';

const TenantInfo = ({ navigation, route: { params } }) => {
  const [item, setItem] = useState({});
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/tenant/1");
    const data = await resp.json();
    setItem(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },{});
  // const {item, fromTenants} = params;
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
          <Text style={styles.headerText}>Thông tin khách thuê</Text>
        </View>
        <View style={styles.body}>
        <View style={styles.imageTag}>
        <Image
        style={styles.largeImage}
        source={{
          uri: item.image,
        }}
      />  
<Text style={styles.id}>{item.name}</Text>

        </View>

        <View style={styles.infoTag}>
        <View style={styles.title}>
            <Text style={styles.detailInfo}>Phòng</Text>
            <Text style={styles.price}>{item.room}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Thuê từ</Text>
            <Text style={styles.price}>{moment(item.time).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Số điện thoại</Text>
            <Text style={styles.price}>{item.phone}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Email</Text>
            <Text style={styles.price}>{item.email}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>CMND/CCCD</Text>
            <Text style={styles.price}>{item.cccd}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Ngày sinh</Text>
            <Text style={styles.price}>{moment(item.birthday).format('DD/MM/YYYY')}</Text>
          </View>

        </View>

        <SwipeableModal />

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
    color: "#F2BF00",
    fontWeight: "bold",
    fontSize: 20,
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
    width: 120,
    height: 120,
    borderRadius: '60%',
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
  imageTag: {
    justifyContent: "center",
    alignItems: 'center',
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
    marginBottom: 20
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#BD0000",
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
    padding: 10,
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
  }
});
export default TenantInfo;
