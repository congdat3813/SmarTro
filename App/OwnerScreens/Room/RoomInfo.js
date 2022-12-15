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
      uri: "data:image/jpeg;base64,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",
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
          uri: item.image,
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
