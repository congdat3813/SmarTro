import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NumberFormat from 'react-number-format';

const DATA1 = [
  {
    id: "215529249",
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    email: 'nva@gmail.com',
    DoB: '05/01/2001',
    room: 101,
    startDate: '01/01/2021',
    image: 'https://i.pinimg.com/originals/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg'
  },
  {
    id: "052201008697",
    name: 'Nguyễn Văn B',
    phone: '0123456789',
    email: 'nvb@gmail.com',
    DoB: '05/02/2001',
    room: 102,
    startDate: '01/02/2021',
    image: 'https://i.pinimg.com/originals/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg'
  },
  {
    id: "052201008699",
    name: 'Nguyễn Văn C',
    phone: '0123456789',
    email: 'nvc@gmail.com',
    DoB: '05/03/2001',
    room: 103,
    startDate: '01/03/2021',
    image: 'https://i.pinimg.com/originals/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg'
  },
];

const Tenants = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [filterdata, setFilterNewData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter((item) => {
        //const itemData = item.name? item.name.toUpperCase() : ''.toUpperCase();
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = query.toString().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterNewData(newData);
      console.log('newData',filterdata);
      
    }
    else{
      setFilterNewData(data);
    }
  };

  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/tenant?id=1");
    const data = await resp.json();
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);


  const Tenant = ({ item }) => {
    return (
      <Pressable
      onPress={() =>
        navigation.navigate('TenantInfo', {item, fromTenants: true})
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

      <Text style={styles.id}>{item.name}</Text>
      <Text style={styles.info}>Phòng: {item.room}</Text>
      <Text style={styles.info}>Số điện thoại: {item.phone}</Text>
      <Text style={styles.info}>Thuê từ: {item.time}</Text>
      </View>
    </Pressable>
    )};

const renderTenant = ({ item }) => {
  return (
    <Tenant
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
          <Text style={styles.headerText}>Khách thuê</Text>
        </View>
        <View style={styles.body}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'center'}}>
        
        <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={searchQuery}
        ></TextInput>
            <FontAwesome5 style={styles.searchIcon} name="search" size={20} color="#CCCCCC"/>
        </View>

<FlatList
          data={filterdata}
          renderItem={renderTenant}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

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
    color: "#F2BF00",
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
    width: "90%",
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
smallImage: {
  width: 90,
  height: 90,
  borderRadius: 10,
  marginRight: 15,
  borderRadius: '60%',
  borderWidth: 2,
  borderColor: '#660B8E',
},
});
export default Tenants;
