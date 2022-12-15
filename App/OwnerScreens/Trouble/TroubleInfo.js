import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, Button, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeableModal1 from "./SwipeableModal1";
import SwipeableModal2 from "./SwipeableModal2";
import moment from 'moment';

const TroubleInfo = ({ navigation, route: { params } }) => {
  const processingBtn = () => ( 
  <SwipeableModal1 /> 
  );

  const processedBtn = () => (
  <SwipeableModal2 />
  );

  const [item, setItem] = useState({});
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/incident/" + params.item.id);
    const data = await resp.json();
    setItem(data);
    setContent(data.status == "Đang đợi xử lý"? processingBtn : (data.status == "Đang xử lý"? processedBtn : null));
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },{});
  // const {item} = params;
  const [content, setContent] = useState(
    item.status == "Đang đợi xử lý"? processingBtn : (item.status == "Đang xử lý"? processedBtn : null)
  );
  // setContent(item.status == "Đang đợi xử lý"? processingBtn : (item.status == "Đang xử lý"? processedBtn : null));
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
        navigation.navigate('Troubles')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>
    </View>
          <Text style={styles.headerText}>Thông tin sự cố</Text>
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
    color: (item.status == 'Đang đợi xử lý')? '#F2BF00' : ((item.status == 'Đã xử lý')? '#0BA108' : '#071D92')
  }}>{item.status}</Text>
    </View>
        <View style={styles.title}>
            <Text style={styles.detailInfo}>Phòng</Text>
            <Text style={styles.price}>{item.room}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Sự cố</Text>
            <Text style={styles.price}>{item.type}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.detailInfo}>Ngày báo cáo</Text>
            <Text style={styles.price}>{moment(item.time).format('DD/MM/YYYY')}</Text>
          </View>

            <Text style={styles.detailInfo}>Mô tả</Text>
            <Text style={styles.description}>{item.note}</Text>

        </View>
        <Text style={styles.header}>Hình ảnh</Text>
        <Image
        style={styles.largeImage}
        source={{
          uri: item.image,
        }}
      />  
        {/* <Pressable style={styles.button}>
          <Text style={{color: 'white', fontSize: 16,  fontWeight: 'bold'}}>Đã xử lý</Text>
        </Pressable> */}
        <View>{content}</View>

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
    width: 370,
    height: 370,
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
    marginBottom: 10
  }
});
export default TroubleInfo;
