import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import {Dropdown} from 'react-native-element-dropdown';


const Services = ({ navigation }) => {
  const [service, setService] = useState([]);
  const [roomValue, setRoomValue] = useState(null);
  const [roomlist, setRoomList] = useState([]);
  const [room, setRoom] = useState(null);
  // const fetchData = async () => {
  //   const resp = await fetch("https://tintrott.cleverapps.io/api/service?id=1");
  //   const data = await resp.json();
  //   setService(data);
  // };
  const fetchService = async (roomid) => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/service?id="+roomid);
    const data = await resp.json();
    setService(data);
  };
  const fetchRoom = async () => {
    const resp = await fetch("https://tintrott.cleverapps.io/api/room/name?id=1");
    const data = await resp.json();
    setRoomList(data);
  };
  useEffect(() => {
    fetchRoom();
    console.log(service);
  },[service]);

  // const onRoomOpen = useCallback(() => {
  // }, []);

  const Item = ({ item }) => (
    <Pressable
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
    {item.name ==="Bảo vệ" ? 
      <FontAwesome5 name="user-shield" size={45} color="#071D92" />:
      item.name === "Wifi" ?
        <FontAwesome5 name="wifi" size={45} color="#071D92" />:
        <FontAwesome5 name="trash" size={45} color="#071D92" />
      
    }
      <Text style={styles.item}>{item.name}</Text>
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
        <View style={styles.dropdownRoom}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyles}
          selectedTextStyle={styles.placeholderStyles}
          data={roomlist}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder='Chọn phòng'
          value={roomValue}
          onChange ={(item) =>{
            setRoomValue(item.id),
            fetchService(item.id)
          }
          }
        />
        </View>

        {/* <Controller
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
            {console.log(room)}
          </View>
        )}
      /> */}
        <View style={styles.menu}>
        <FlatList
          data={service}
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
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    borderColor: '#660B8E',
    borderWidth: 1,
    borderRadius: 16,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6, 
    marginBottom: 20   
  },
  placeholderStyles: {
    color: '#660B8E',
    marginLeft: 10
  }
});
export default Services;
