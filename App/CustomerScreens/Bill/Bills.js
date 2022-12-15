import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from 'moment';

// const DATA1 = [
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

const Bills = ({ navigation }) => {
//   const formatTime = (time) =>(
// <Moment format="DD/MM/YYYY">
//                 {time}
//             </Moment>
//   );

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/bill/tenants?id=2");
    const data = await resp.json();
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);
  const Bill = ({ item }) => (
    <Pressable
    onPress={() =>
      navigation.navigate('BillInfo', {item, fromFinance: false})
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
      <Text style={{
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 'bold',
    // marginBottom: 5,
    color: item.status == "Chưa thanh toán"? '#F2BF00' : (item.status == "Đã thanh toán"? "#071D92" : "#BD0000")
  }}>{item.status}</Text>
    </View>
    <View style={styles.title}>
    <Text style={styles.info}>Phòng: {item.room}</Text>
    <Text style={styles.price}>{item.price}đ</Text>
    </View>
    <Text style={styles.info}>Loại: {item.type}</Text>
    <Text style={styles.info}>Hạn thanh toán: {moment(item.startTime).format('DD/MM/YYYY')} - {moment(item.endTime).format('DD/MM/YYYY')}</Text>
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
          <Text style={styles.headerText}>Hóa đơn</Text>
        </View>
        <View style={styles.body}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'center'}}>
        
                <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      ></TextInput>
                  {/* <FontAwesome5
              name="sliders-h"
              size={30}
              color="#660B8E"
              style={{ marginLeft: 15, borderWidth: 2, borderColor: '#660B8E', borderRadius: 10, padding: 8, }}
            /> */}
            <FontAwesome5 style={styles.searchIcon} name="search" size={20} color="#CCCCCC"/>
      </View>

      {/* <View style={styles.buttons}>

<Pressable
  onPress={() => {
    setStatus("Chưa thanh toán");
    setStatusColor("#F2BF00");
  }}
  style={(status == "Chưa thanh toán")? styles.yellowButton : styles.yellowButtonOutline}>
  <Text style={(status == "Chưa thanh toán")? {color: 'black', fontSize: 15, fontWeight: 'bold'} : {color: "#F2BF00", fontSize: 15, fontWeight: 'bold'}}>Chưa thanh toán</Text>
</Pressable>
<Pressable
  onPress={() => {
    setStatus("Đã thanh toán");
    setStatusColor("#071D92");
  }}
  style={(status == "Đã thanh toán")? styles.blueButton : styles.blueButtonOutline}>
  <Text style={(status == "Đã thanh toán")? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "#071D92", fontSize: 15, fontWeight: 'bold'}}>Đã thanh toán</Text>
</Pressable>
<Pressable
  onPress={() => {
    setStatus("Trễ hạn");
    setStatusColor("#BD0000");
  }}
  style={(status == "Trễ hạn")? styles.redButton : styles.redButtonOutline}>
  <Text style={(status == "Trễ hạn")? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "#BD0000", fontSize: 15, fontWeight: 'bold'}}>Trễ hạn</Text>
</Pressable>
</View> */}

<FlatList
          data={data}
          renderItem={renderBill}
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
    // paddingLeft: 15,
    // paddingRight: 15,
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
    height: '100%',
    marginBottom: 20
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
    marginBottom: 5
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
    marginBottom: 15,
    alignSelf: 'center'
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
    paddingLeft: 55
  },
  searchIcon: {
    position: 'absolute',
    left: 20
},
});
export default Bills;
