import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import moment from 'moment';

const RoomInfo = ({ navigation, route: { params } }) => {
  const [item, setItem] = useState({});
  const fetchData = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/room/" + params.item.id);
    const data = await resp.json();
    setContent(
      <View>
      <View style={styles.infoTag}>
              <View style={styles.title}>
                  <Text style={styles.detailInfo}>Phòng</Text>
                  <Text style={styles.price}>{data.name}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Diện tích</Text>
                  <Text style={styles.price}>{data.area}m2</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Giá</Text>
                  <Text style={styles.price}>{data.price}đ</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Khách thuê</Text>
                  <Text style={styles.price}>{data.numRents}/{data.numberOfTenants}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Thuê từ</Text>
                  <Text style={styles.price}>{moment(data.rentFrom).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Đối tượng</Text>
                  <Text style={styles.price}>{data.sex}</Text>
                </View>
      
              </View>
            
                <Text style={styles.header}>Dịch vụ</Text>
      
                <View style={styles.descriptionTag}>
                <FlatList
                data={data.serviceIList}
                renderItem={renderService}
                // keyExtractor={(item) => item.id}
                style={{}}
              />
                </View>
                </View>
    );
    setItem(data);
  };
  useEffect(() => {
    fetchData();
  },{});

  const [data, setData] = useState([]);
  const fetchData1 = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/tenant/room?id=1");
    const data = await resp.json();
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData1();
  },[]);

  const [status, setStatus] = useState(true);
  // const {item} = params;
  const [content, setContent] = useState(
      <View>
      <View style={styles.infoTag}>
              <View style={styles.title}>
                  <Text style={styles.detailInfo}>Phòng</Text>
                  <Text style={styles.price}>{item.name}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Diện tích</Text>
                  <Text style={styles.price}>{item.area}m2</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Giá</Text>
                  <Text style={styles.price}>{item.price}đ</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Khách thuê</Text>
                  <Text style={styles.price}>{item.numRents}/{item.numberOfTenants}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Thuê từ</Text>
                  <Text style={styles.price}>{moment(item.rentFrom).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Đối tượng</Text>
                  <Text style={styles.price}>{item.sex}</Text>
                </View>
      
              </View>
            
                <Text style={styles.header}>Dịch vụ</Text>
      
                <View style={styles.descriptionTag}>
                <FlatList
                data={item.serviceIList}
                renderItem={renderService}
                // keyExtractor={(item) => item.id}
                style={{}}
              />
                </View>
                </View>
          );

  const Tenant = ({ item }) => {
    return (
      <Pressable
      onPress={() =>
        navigation.navigate('TenantInfo', {item, fromTenants: false})
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
      uri: "https://i.pinimg.com/originals/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg",
    }}
  />  
  <View>

      <Text style={styles.id}>{item.name}</Text>
      <Text style={styles.info}>Phòng: {item.room}</Text>
      <Text style={styles.info}>Số điện thoại: {item.phone}</Text>
      <Text style={styles.info}>Thuê từ: {moment(item.rentFrom).format('DD/MM/YYYY')}</Text>
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

  const renderService = ({ item }) => {
    return (
      <View style={styles.title}>
      <Text style={styles.detailInfo}>{item.name}</Text>
      <Text style={styles.price}>{item.price}đ</Text>
    </View>
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
        navigation.navigate('Rooms')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>
          </View>
          <Text style={styles.headerText}>Thông tin phòng</Text>
        </View>
        <View style={styles.body}>
        <Image
        style={styles.largeImage}
        source={{
          uri: "https://i.pinimg.com/originals/4a/1b/0d/4a1b0d2f3b0dc3479ac684a6ba458d34.jpg",
        }}
      />  

<View style={styles.buttons}>
      <Pressable
  onPress={() => {
    setStatus(true);
    setContent(
      <View>
      <View style={styles.infoTag}>
              <View style={styles.title}>
                  <Text style={styles.detailInfo}>Phòng</Text>
                  <Text style={styles.price}>{item.name}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Diện tích</Text>
                  <Text style={styles.price}>{item.area}m2</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Giá</Text>
                  <Text style={styles.price}>{item.price}đ</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Khách thuê</Text>
                  <Text style={styles.price}>{item.numRents}/{item.numberOfTenants}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Thuê từ</Text>
                  <Text style={styles.price}>{moment(item.rentFrom).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.detailInfo}>Đối tượng</Text>
                  <Text style={styles.price}>{item.sex}</Text>
                </View>
      
              </View>
            
                <Text style={styles.header}>Dịch vụ</Text>
      
                <View style={styles.descriptionTag}>
                <FlatList
                data={item.serviceIList}
                renderItem={renderService}
                // keyExtractor={(item) => item.id}
                style={{}}
              />
                </View>
                </View>
    );
  }}
  style={(status)? styles.violetButton : styles.violetButtonOutline}>
  <Text style={(status)? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "#660B8E", fontSize: 15, fontWeight: 'bold'}}>Thông tin</Text>
</Pressable>
<Pressable
  onPress={() => {
    setStatus(false);
    setContent(
      <FlatList
          data={data}
          renderItem={renderTenant}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
    );  
  }}
  style={(!status)? styles.yellowButton : styles.yellowButtonOutline}>
  <Text style={(!status)? {color: 'black', fontSize: 15, fontWeight: 'bold'} : {color: "#F2BF00", fontSize: 15, fontWeight: 'bold'}}>Khách thuê</Text>
</Pressable>
</View>

<View>{content}</View>


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
    marginBottom: 20,
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
    borderRadius: '60%',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#660B8E',
  },
  largeImage: {
    width: 370,
    height: 220,
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
  descriptionTag: {
    width: 370,
    height: 110,
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
    paddingTop: 15
  },
});
export default RoomInfo;
