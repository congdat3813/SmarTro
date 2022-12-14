import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DATA1 = [
  {
    id: "1234",
    room: 101,
    type: 'Tiền phòng',
    group: 'Thu',
    value: 733333,
    user: 'Nguyễn Văn A'
  },
  {
    id: "2345",
    room: 102,
    type: 'Tiền phòng',
    group: 'Thu',
    value: 733333,
    user: 'Nguyễn Văn B'
  },
  {
    id: "3456",
    room: 102,
    type: 'Tiền phòng',
    group: 'Thu',
    value: 733333,
    user: 'Nguyễn Văn C'
  },
];

const Transactions = ({ navigation }) => {
  const Transaction = ({ item }) => {
    const sign = (item.group == 'Thu')? '+' : '-';
    return (
    <Pressable
      onPress={() =>
        navigation.navigate('TransactionInfo', {item, fromFinance: false})
      }
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#F3E8FF" : "white",
          alignItems: "left",
          justifyContent: 'center',
          alignSelf: 'center',
          width: 370,
          height: 120,
          borderRadius: 16,
          shadowOffset: {
            width: 9,
            height: 9,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 10
        },
      ]}
    >
      <View style={styles.title}>
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.price}>{sign}{item.value}đ</Text>
      </View>
      <Text style={styles.info}>Phòng: {item.room}</Text>
      <Text style={styles.info}>Loại: {item.type}</Text>
      <Text style={styles.info}>Người thực hiện: {item.user}</Text>
    </Pressable>
    )};

    const renderTransaction = ({ item }) => {
      return (
        <Transaction
          item={item}
          onPress={() => setSelectedId(item.id)}
        />
      );
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
        navigation.navigate('Finance')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>  
              </View>
          <Text style={styles.headerText}>Thu chi</Text>
        </View>
        <View style={styles.body}>

        <FlatList
          data={DATA1}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

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
    height: "100%"
    // marginBottom: 20
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
  title: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontStyle: "italic",
  },
  menu: {
    // alignItems: 'center',
  },
  seeAll: {
    color: "#660B8E",
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  yellowButton: {
    width: 140,
    height: 40,
    backgroundColor: "#F2BF00",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  blueButton: {
    width: 120,
    height: 40,
    backgroundColor: "#071D92",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  redButton: {
    width: 80,
    height: 40,
    backgroundColor: "#BD0000",
    borderRadius: 12,
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
    marginBottom: 10
  }
});
export default Transactions;
