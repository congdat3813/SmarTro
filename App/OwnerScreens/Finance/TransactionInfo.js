import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TransactionInfo = ({ navigation, route: { params } }) => {
  const [item, setItem] = useState({});
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/revenue/all/1");
    const data = await resp.json();
    setItem(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);

  // const {item, fromFinance} = params;
  // const backPage = fromFinance? 'Finance' : 'Transactions';
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
          <Text style={styles.headerText}>Thông tin thu chi</Text>
        </View>
        <View style={styles.body}>

        <View style={styles.infoTag}>
        <Text style={styles.id}>#{item.id}</Text>
        <View style={styles.title}>
            <Text style={styles.detailInfo}>Phòng</Text>
            <Text style={styles.price}>{item.room}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Loại</Text>
            <Text style={styles.price}>{item.type}</Text>
          </View>

          <View style={styles.title}>
            <Text style={styles.detailInfo}>Nhóm</Text>
            <Text style={styles.price}>{item.group}</Text>
          </View>

          <View style={styles.title}>
            <Text style={styles.detailInfo}>Tổng cộng</Text>
            <Text style={styles.price}>{item.price}đ</Text>
          </View>

          <View style={styles.title}>
            <Text style={styles.detailInfo}>Người thực hiện</Text>
            <Text style={styles.price}>{item.user}</Text>
          </View>

        </View>

        <Text style={styles.header}>Ghi chú</Text>
        <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      ></TextInput>

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
    height: 40,
    backgroundColor: "#F2BF00",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  blueButton: {
    width: 135,
    height: 40,
    backgroundColor: "#071D92",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  redButton: {
    width: 80,
    height: 40,
    backgroundColor: "#BD0000",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowButtonOutline: {
    width: 140,
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
    width: 120,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#071D92",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  redButtonOutline: {
    width: 80,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#BD0000",
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
button: {
  width: 370,
  height: 50,
  backgroundColor: "#BD0000",
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center'
},
});
export default TransactionInfo;
