import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ProgressViewIOSBase
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DATA1 = [
  {
    id: "1234",
    title: 'Phòng trọ sinh viên',
    price: 3000000,
    number: 3,
    location: '162 Lê Quý Đôn, Tân Lập, Đông Hòa, Dĩ An,...',
    description: 'Phòng trọ thoáng mát, đầy đủ tiện nghi, giá cả vừa phải đối với sinh viên',
    image: 'https://i.pinimg.com/originals/4a/1b/0d/4a1b0d2f3b0dc3479ac684a6ba458d34.jpg'
  },
  {
    id: "2345",
    title: 'Phòng trọ sinh viên',
    price: 4000000,
    number: 4,
    location: '162 Lê Quý Đôn, Tân Lập, Đông Hòa, Dĩ An,...',
    description: 'Phòng trọ thoáng mát, đầy đủ tiện nghi, giá cả vừa phải đối với sinh viên',
    image: 'https://i.pinimg.com/originals/4a/1b/0d/4a1b0d2f3b0dc3479ac684a6ba458d34.jpg'
  },
];

const Posts = ({ navigation }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/room/tus");
    const data = await resp.json();
    setData1(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);

  const Post = ({ item }) => {
    return (
      <Pressable
      onPress={() =>
        navigation.navigate('PostInfo', {item})
      }   
      style={styles.infoTag1}>
      <Image
    style={styles.largeImage}
    source={{
      uri: item.image,
    }}
  />
      <View style={styles.title}>
        <Text style={styles.id}>{item.title}</Text>
        <Text style={styles.price}>{item.price}đ</Text>
      </View>  
      <View style={{flexDirection: 'row'}}>
      <FontAwesome5
          name="user-friends"
          size={15}
          color="#F2BF00"
          style={{ marginRight: 15 }}
        />
        <Text style={styles.info}>Phòng {item.number} người</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
      <FontAwesome5
          name="location-arrow"
          size={15}
          color="#660B8E"
          style={{ marginRight: 15 }}
        />
      <Text style={styles.address}>{item.location}</Text>
      </View>
      </Pressable>
    )};

    const renderPost = ({ item }) => {
      return (
        <Post
          item={item}
          onPress={() => setSelectedId(item.id)}
        />
      );
    }; 

    const Post2 = ({ item }) => {
      return (
        <Pressable
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
  
        <Text style={styles.id}>Phòng {item.room}</Text>
        <Text style={styles.info}></Text>
        <Text style={styles.info}>Giá phòng: {item.price}đ</Text>
        <Text style={styles.info}>Khách thuê: {item.hired}/{item.number}</Text>
        </View>
      </Pressable>
      )};
  
      const renderPost2 = ({ item }) => {
        return (
          <Post2
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
          <Text style={styles.headerText}>Tìm phòng</Text>
        </View>
        <View style={styles.body}>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'center'}}>
        
                <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      ></TextInput>
      {/* <Pressable
      onPress={() => 
        navigation.navigate('Home')
      }
      >
                  <FontAwesome5
              name="sliders-h"
              size={30}
              color="#660B8E"
              style={{ marginLeft: 15, borderWidth: 2, borderColor: '#660B8E', borderRadius: 10, padding: 8, }}
            />
      </Pressable> */}
            <FontAwesome5 style={styles.searchIcon} name="search" size={20} color="#CCCCCC"/>
      </View>

        <FlatList
          data={data}
          renderItem={renderPost}
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
    marginBottom: 20,
  },
  id: {
    color: "#660B8E",
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
  address: {
    fontSize: 15,
    // fontWeight: 'bold',
    // marginBottom: 5,
    marginRight: 10,
    width: 310,
    height: 20
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
    fontSize: 15,
    fontStyle: "italic",
    color: '#0BA108'
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
    width: 175,
    height: 40,
    backgroundColor: "#F2BF00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  violetButton: {
    width: 175,
    height: 40,
    backgroundColor: "#660B8E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  yellowButtonOutline: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#F2BF00",
    justifyContent: "center",
    alignItems: "center",
  },
  violetButtonOutline: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#660B8E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 15,
    alignSelf: 'center'
  },
  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#660B8E',
  },
  largeImage: {
    width: 340,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#660B8E',
  },
  infoTag1: {
    justifyContent: "center",
    alignSelf: 'center',
    width: 370,
    height: 310,
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
    marginBottom: 10
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
export default Posts;
