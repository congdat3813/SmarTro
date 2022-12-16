import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from "react-native-modal";

const DATA = [
  {
    id: "7",
    title: "Tìm phòng",
    icon: "search",
    color: "#F08672",
    name: "Posts",
  },
  {
    id: "5",
    title: "Phòng đã lưu",
    icon: "bookmark",
    color: "#F08672",
    name: "SavedPosts",
  },
];

const DATA1 = [
  {
    id: "1",
    title: "Phòng của tôi",
    icon: "door-open",
    color: "#660B8E",
    name: "RoomInfo",
  },
  {
    id: "6",
    title: " Thông tin \n   cá nhân",
    icon: "user-alt",
    color: "#F2BF00",
    name: "ProfileInfo",
  },
  {
    id: "2",
    title: "Hóa đơn",
    icon: "money-bill-wave",
    color: "#0BA108",
    name: "Bills",
  },
];

const DATA2 = [
  {
    id: "3",
    title: "Dịch vụ",
    icon: "cogs",
    color: "#071D92",
    name: "Services",
  },
  {
    id: "4",
    title: "Sự cố",
    icon: "exclamation-triangle",
    color: "#BD0000",
    name: "Troubles",
  },

];

const Home = ({ navigation }) => {
  const SwipeableModal = () => {

    // onSubmit = () => alert(this.state.data);
    const [visible, setVisible] = useState(false);
  
      return (
        <Fragment>
          <Modal
            isVisible={visible}
            backdropOpacity={0.3}
            swipeDirection="left"
            onSwipeComplete={()=>setVisible(false)}
            onBackdropPress={()=>setVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalDescription}>
              Bạn có chắc muốn đăng xuất?
              </Text>
              <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={()=>{
                  setVisible(false);
                  navigation.navigate('Login');
                }}
              >
                
                  <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Đồng ý</Text>
                  
              </Pressable>
              <Pressable
                onPress={()=>setVisible(false)}
              >
                
                  <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Hủy</Text>
                  
              </Pressable>
              </View>
            </View>
          </Modal>
  
          <Pressable
          onPress={()=> {setVisible(true); }}
          >
                      <FontAwesome5 name='sign-out-alt' size={30} color='black' style={{marginRight: 15}}/>
          </Pressable>
        </Fragment>
      );
  }


  const Item = ({ item }) => (
    <Pressable
      onPress={() => 
        navigation.navigate(item.name)
      }
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#F3E8FF" : "white",
          alignItems: "center",
          justifyContent: "center",
          width: 110,
          height: 110,
          borderRadius: 16,
          shadowOffset: {
            width: 9,
            height: 9,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
      ]}
    >
      <FontAwesome5 name={item.icon} size={45} color={item.color} />
      <Text style={styles.item}>{item.title}</Text>
    </Pressable>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
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
            <View></View>
          <SwipeableModal />
          </View>
          <View style={{flexDirection: 'row', position: 'absolute', alignSelf: 'center', top: 42, marginBottom: 10, alignItems: 'center'}}>
          <Image
        style={styles.smallImage}
        source={require('../../assets/logo.png')}
      />  
          <Text style={styles.headerText}>TinTro</Text>
          </View>
        </View>
        
        <View style={styles.body}>
        {/* <Text style={styles.header}>Nhắc nhở</Text> */}
        <Text style={styles.header}>Khởi tạo</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 12, backgroundColor: "transparent" }} />
          )}
        />

        {/* <Pressable
    onPress={() => {
      navigation.navigate('Posts')
    }}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "#F3E8FF" : "white",
        alignItems: "center",
        justifyContent: "center",
        width: 110,
        height: 110,
        borderRadius: 16,
        shadowOffset: {
          width: 9,
          height: 9,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginLeft: 5,
        marginBottom: 15
      },
    ]}
  >
    <FontAwesome5 name="search" size={45} color="#F08672" />
    <Text style={styles.item}>Tìm phòng</Text>
  </Pressable> */}
        
        <Text style={styles.header}>Quản lý</Text>
        <View style={styles.menu}>
        <FlatList
          data={DATA1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 12, backgroundColor: "transparent" }} />
          )}
        />
        <FlatList
          data={DATA2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 12, backgroundColor: "transparent" }} />
          )}
        />
        </View>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    // position: 'absolute',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
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
    marginLeft: 5,
    width: "100%",
    height: 130,
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
  smallImage: {
    width: 73.5,
    height: 30,
    borderRadius: 10,
    marginRight: 5
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    marginVertical: 350
  },
  modalDescription: {
    // padding: 20,
    fontSize: 20,
    marginBottom: 20
  },
});
export default Home;