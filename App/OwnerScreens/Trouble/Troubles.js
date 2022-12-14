import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, ScrollView, Button, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from "moment";

const Troubles = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [datastart, setDatastart]= useState([]);
  const [filterdata, setFilterNewData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter((item) => {
        const itemData = item.room? item.room.toUpperCase() : ''.toUpperCase();
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
    setDatastart(data);
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);


  const [status, setStatus] = useState("Tất cả");
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
      uri: "https://i.pinimg.com/564x/77/08/bd/7708bde01eb3bfcf8a0d29b19caddb60.jpg",
    }}
  />  
  <View>

      {/* <Text style={styles.id}>#{item.id}</Text> */}
      <View style={styles.title}>
      <Text style={styles.id}>#{item.id}</Text>
      <Text style={{
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: 'bold',
    marginBottom: 5,
    color: item.status == "Đang đợi xử lý"? '#F2BF00' : (item.status == "Đang xử lý"? "#071D92" : "#0BA108")
  }}>{item.status}</Text>
    </View>
      <Text style={styles.info}>Phòng: {item.room}</Text>
      <Text style={styles.info}>Loại: {item.type}</Text>
      <Text style={styles.info}>Thời gian: {moment(item.time).format('DD/MM/YYYY')}</Text>
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
        navigation.navigate('AddTrouble')
      }
    >
      <FontAwesome5 name='plus-circle' size={30} color='#BD0000' style={{marginRight: 15}}/>
    </Pressable>   
          
          </View>
          <Text style={styles.headerText}>Sự cố</Text>
        </View>
        <View style={styles.body}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'center'}}>
        
                <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={{searchQuery}}
      ></TextInput>
            <FontAwesome5 style={styles.searchIcon} name="search" size={20} color="#CCCCCC"/>
      </View>
        <View style={styles.buttons}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            setStatus("Tất cả");
          }}
          style={(status == "Tất cả")? styles.blackButton : styles.blackButtonOutline}>
          <Text style={(status == "Tất cả")? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "black", fontSize: 15, fontWeight: 'bold'}}>Tất cả</Text>
        </Pressable> 
        <Pressable
          onPress={() => {
            setStatus("Đang đợi xử lý");
            setData(datastart.filter(item => item.status == "Đang đợi xử lý"));
            setFilterNewData(datastart.filter(item => item.status == "Đang đợi xử lý"));
          }}
          style={(status == "Đang đợi xử lý")? styles.yellowButton : styles.yellowButtonOutline}>
          <Text style={(status == "Đang đợi xử lý")? {color: 'black', fontSize: 15, fontWeight: 'bold'} : {color: "#F2BF00", fontSize: 15, fontWeight: 'bold'}}>Đang đợi xử lý</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setStatus("Đang xử lý");
            setData(datastart.filter(item => item.status == "Đang xử lý"));
            setFilterNewData(datastart.filter(item => item.status == "Đang xử lý"));
          }}
          style={(status == "Đang xử lý")? styles.blueButton : styles.blueButtonOutline}>
          <Text style={(status == "Đang xử lý")? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "#071D92", fontSize: 15, fontWeight: 'bold'}}>Đang xử lý</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setStatus("Đã xử lý");
            setData(datastart.filter(item => item.status == "Đã xử lý"));
            setFilterNewData(datastart.filter(item => item.status == "Đã xử lý"));
          }}
          style={(status == "Đã xử lý")? styles.greenButton : styles.greenButtonOutline}>
          <Text style={(status == "Đã xử lý")? {color: 'white', fontSize: 15, fontWeight: 'bold'} : {color: "#0BA108", fontSize: 15, fontWeight: 'bold'}}>Đã xử lý</Text>
        </Pressable>
        </ScrollView>
        </View>

        <FlatList
          data={status == "Tất cả"? datastart: filterdata}
          renderItem={renderTrouble}
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
blackButton: {
  width: 135,
  height: 40,
  backgroundColor: "black",
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15
},
blackButtonOutline: {
  width: 135,
  height: 40,
  backgroundColor: "white",
  borderWidth: 2,
  borderRadius: 12,
  borderColor: "black",
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15
},
});
export default Troubles;
