import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeableModal1 from "./SwipeableModal1";
import SwipeableModal2 from "./SwipeableModal2";

const BillInfo = ({ navigation, route: { params } }) => {
  const [item, setItem] = useState({});
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/bill/all/1");
    const data = await resp.json();
    setItem(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);

  // const {item, fromFinance} = params;
  // const backPage = fromFinance? 'Finance' : 'Bills';
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
          <Text style={styles.headerText}>Thông tin hóa đơn</Text>
        </View>
        <View style={styles.body}>

        <View style={styles.infoTag}>
        <View style={styles.title}>
      <Text style={styles.id}>#{item.id}</Text>
      <Text style={{
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 'bold',
    // marginBottom: 5,
    color: (item.status == 'Chưa thanh toán')? '#F2BF00' : ((item.status == 'Trễ hạn')? '#BD0000' : '#071D92')
  }}>{item.status}</Text>
    </View>
        <View style={styles.title}>
            <Text style={styles.detailInfo}>Phòng</Text>
            <Text style={styles.price}>{item.room}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Loại</Text>
            <Text style={styles.price}>{item.type}</Text>
          </View>

          <View style={styles.title}>
            <Text style={styles.detailInfo}>Tổng cộng</Text>
            <Text style={styles.price}>{item.value}đ</Text>
          </View>

            <Text style={styles.detailInfo}>Hạn thanh toán</Text>
            <Text style={styles.description}>{item.startDate} - {item.endDate}</Text>

        </View>

        <Text style={styles.header}>Ghi chú</Text>
        <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      ></TextInput>

        <View style={styles.buttons}>

        <SwipeableModal1 />
        <SwipeableModal2 />

        </View>
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
    color: "#0BA108",
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
    alignSelf: 'center'
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

  yellowButton: {
    width: 125,
    height: 50,
    backgroundColor: "#F2BF00",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  blueButton: {
    width: 175,
    height: 50,
    backgroundColor: "#071D92",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  redButton: {
    width: 175,
    height: 50,
    backgroundColor: "#BD0000",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 15
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
    paddingLeft: 15,
    marginBottom: 15
  },
  searchIcon: {
    position: 'absolute',
    left: 20
},
});
export default BillInfo;
