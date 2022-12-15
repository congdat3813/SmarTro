import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, Button, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DATA1 = [
  {
    id: "1234",
    status: "Đang đợi xử lý",
    room: 101,
    type: 'Hỏng đèn',
    date: '01/01/2022',
    description: 'Bóng đèn dài bị vỡ.',
    image: 'https://i.pinimg.com/564x/77/08/bd/7708bde01eb3bfcf8a0d29b19caddb60.jpg'
  },
  {
    id: "2345",
    status: "Đang xử lý",
    room: 102,
    type: 'Hỏng đèn',
    date: '01/01/2022',
    description: 'Bóng đèn dài bị cháy.',
    image: 'https://i.pinimg.com/564x/77/08/bd/7708bde01eb3bfcf8a0d29b19caddb60.jpg'
  },
  {
    id: "3456",
    status: "Đã xử lý",
    room: 102,
    type: 'Hỏng đèn',
    date: '01/01/2022',
    description: 'Bóng đèn dài bị cháy.',
    image: 'https://i.pinimg.com/564x/77/08/bd/7708bde01eb3bfcf8a0d29b19caddb60.jpg'
  },
];

const Troubles = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filterdata, setFilterNewData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter((item) => {
        const itemData = item.type? item.type.toUpperCase() : ''.toUpperCase();
        const textData = query.toString().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterNewData(newData);      
    }
    else{
      setFilterNewData(data);
    }
  };
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/incident?id=1&type=1");
    const data = await resp.json();
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);

  const Trouble = ({ item }) => {
    return (
      <Pressable
      onPress={() =>
        navigation.navigate('TroubleInfo', {item})
      }    
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#F3E8FF" : "white",
          alignItems: "center",
          // justifyContent: 'center',
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
          marginBottom: 10,
          flexDirection: 'row'
        },
      ]}
    >
    <Image
    style={styles.smallImage}
    source={{
      uri: item.image,
    }}
  />  
  <View>

      {/* <Text style={styles.id}>#{item.id}</Text> */}
      <View style={styles.title}>
    </View>
      <Text style={styles.info}>{item.status}</Text>
      <Text style={styles.info}>Loại: {item.type}</Text>
      <Text style={styles.info}>Thời gian: {item.date}</Text>
      </View>
    </Pressable>
    )};

    const renderTrouble = ({ item }) => {
      return (
        <Trouble
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
    justifyContent: 'space-between',
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
    height: "100%",
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
    width: 230,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 5,
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
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#660B8E'
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
    marginRight: 15
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
    marginBottom: 10,
    alignSelf: 'center'
  },
  input: {
    height: 50,
    width: '90%',
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
export default Troubles;
