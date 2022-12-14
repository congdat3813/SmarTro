import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

const rooms = [
  { label: "101", value: "101" },
  { label: "102", value: "102" },
  { label: "103", value: "103" },
  { label: "201", value: "201" },
  { label: "202", value: "202" },
  { label: "203", value: "203" },
];

const DATA1 = [
  {
    id: "1",
    title: "Bảo vệ",
    icon: "user-shield",
    color: "#071D92",
    name: "Room",
  },
  {
    id: "2",
    title: "Wifi",
    icon: "wifi",
    color: "#071D92",
    name: "Tenant",
  },
  {
    id: "3",
    title: "Rác",
    icon: "trash",
    color: "#071D92",
    name: "Finance",
  },
];

const Services = ({ navigation }) => {
  const { handleSubmit, control } = useForm();
  const [roomOpen, setRoomOpen] = useState(false);
  const [roomValue, setRoomValue] = useState(null);
  const [room, setRoom] = useState(rooms);
  const onRoomOpen = useCallback(() => {
  }, []);
  const Item = ({ item }) => (
    <Pressable
      onPress={() => 
        navigation.navigate(item.name)
      }
      style={() => [
        {
          backgroundColor: "white",
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
          <Pressable
      onPress={() => 
        navigation.navigate('Home')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable> 
    <Pressable
      onPress={() => 
        navigation.navigate('AddService')
      }
    >
<FontAwesome5 name='plus-circle' size={30} color='#071D92' style={{marginRight: 15}}/>
</Pressable>    
          
          </View>
          <Text style={styles.headerText}>Dịch vụ</Text>
        </View>
        
        <View style={styles.body}>
        
        <Text style={styles.header}>Xem dịch vụ</Text>
        <Controller
        name="room"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownRoom}>
            <DropDownPicker
              style={styles.dropdown}
              open={roomOpen}
              value={roomValue} //roomValue
              items={room}
              setOpen={setRoomOpen}
              setValue={setRoomValue}
              setItems={setRoom}
              placeholder="Chọn phòng"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onRoomOpen}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />
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
  dropdownRoom: {
    zIndex: 20,
    borderWidth: 0,
    borderRadius: 16,
  },
  dropdown: {
    zIndex: 10,
    borderWidth: 0,
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6, 
    marginBottom: 20   
  }
});
export default Services;
