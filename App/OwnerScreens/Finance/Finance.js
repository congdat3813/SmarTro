import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from 'moment';

// const data1 = [
//   {
//     id: "1234",
//     room: 101,
//     type: 'Tiền phòng',
//     group: 'Thu',
//     value: 733333,
//     user: 'Nguyễn Văn A'
//   },
//   {
//     id: "2345",
//     room: 102,
//     type: 'Tiền phòng',
//     group: 'Thu',
//     value: 733333,
//     user: 'Nguyễn Văn B'
//   },
//   {
//     id: "3456",
//     room: 102,
//     type: 'Tiền phòng',
//     group: 'Thu',
//     value: 733333,
//     user: 'Nguyễn Văn C'
//   },
// ];

// const data2 = [
//   {
//     id: "1234",
//     status: 'Chưa thanh toán',
//     room: 101,
//     type: 'Tiền phòng',
//     value: 733333,
//     startDate: '01/01/2021',
//     endDate: '01/02/2021'
//   },
//   {
//     id: "2345",
//     status: 'Đã thanh toán',
//     room: 102,
//     type: 'Tiền phòng',
//     value: 733333,
//     startDate: '01/01/2021',
//     endDate: '01/02/2021'
//   },
//   {
//     id: "3456",
//     status: 'Trễ hạn',
//     room: 103,
//     type: 'Tiền phòng',
//     value: 733333,
//     startDate: '01/01/2021',
//     endDate: '01/02/2021'
//   },
// ];

const Finance = ({ navigation }) => {
  const [bills, setBills] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchData1 = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/revenue/all?id=1");
    const data = await resp.json();
    // setData1(data);
    setTransactions([data[0], data[1]]);
    // setFilterNewData(data);
  };
  useEffect(() => {
    fetchData1();
  },[]);

  const fetchData2 = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/bill?id=1");
    const data = await resp.json();
    // setData2(data);
    setBills([data[0], data[1]]);
    // setFilterNewData(data);
  };
  useEffect(() => {
    fetchData2();
  },[]);

  const Transaction = ({ item }) => {
    const sign = (item.group == 'Thu')? '+' : '-';
    return (
    <Pressable
    onPress={() =>
      navigation.navigate('TransactionInfo', {item, fromFinance: true})
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
        <Text style={styles.id}>{item.code}</Text>
        <Text style={styles.price}>{sign}{item.price}đ</Text>
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

    const Bill = ({ item }) => (
      <Pressable
      onPress={() =>
        navigation.navigate('BillInfo', {item, fromFinance: true})
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
      <Text style={styles.id}>{item.code}</Text>
      <Text style={{
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 'bold',
    // marginBottom: 5,
    color: (item.status == 'Chưa thanh toán')? '#F2BF00' : ((item.status == 'Trễ hạn')? '#BD0000' : '#071D92')
  }}>{item.status}</Text>
    </View>
    <View style={styles.title}>
    <Text style={styles.info}>Phòng: {item.room}</Text>
    <Text style={styles.priceBill}>{item.price}đ</Text>
    </View>
      <Text style={styles.info}>Loại: Tiền phòng</Text>
      <Text style={styles.info}>Hạn thanh toán: 01/01/2021 - 01/02/2021</Text>
    </Pressable>
      );

  const renderBill = ({ item }) => {
    return (
      <Bill
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
        navigation.navigate('Home')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>          

          
          </View>
          <Text style={styles.headerText}>Tài chính</Text>
        </View>
        <View style={styles.body}>
        <Text style={styles.header}>Thu chi</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
          <Pressable
      onPress={() => 
        navigation.navigate('Transactions')
      }
    >
      <Text style={styles.seeAll}>Xem tất cả</Text>  
    </Pressable>          
            

        <Text style={styles.header}>Hóa đơn</Text>
        <FlatList
          data={bills}
          renderItem={renderBill}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
          <Pressable
      onPress={() => 
        navigation.navigate('Bills')
      }
    >
      <Text style={styles.seeAll}>Xem tất cả</Text>  
    </Pressable>   

        {/* <View style={styles.buttons}>

        <Pressable style={styles.yellowButton}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>Chưa thanh toán</Text>
        </Pressable>
        <Pressable style={styles.blueButton}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Đã thanh toán</Text>
        </Pressable>
        <Pressable style={styles.redButton}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Trễ hạn</Text>
        </Pressable>
        </View>

        <View style={styles.buttons}>

        <Pressable style={styles.yellowButtonOutline}>
          <Text style={{color: "#F2BF00", fontSize: 15, fontWeight: 'bold'}}>Chưa thanh toán</Text>
        </Pressable>
        <Pressable style={styles.blueButtonOutline}>
          <Text style={{color: "#071D92", fontSize: 15, fontWeight: 'bold'}}>Đã thanh toán</Text>
        </Pressable>
        <Pressable style={styles.redButtonOutline}>
          <Text style={{color: "#BD0000", fontSize: 15, fontWeight: 'bold'}}>Trễ hạn</Text>
        </Pressable>
        </View> */}
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
    // alignItems: "center",
    // justifyContent: "center",
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
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingTop: 15,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#660B8E",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  list: {
    width: "100%",
    // marginBottom: 20,
    height: 270,
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
  priceBill: {
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 5
  },
  seeAll: {
    color: "#660B8E",
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 15
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
export default Finance;
