import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import RoomItem from './Item';
export default function ORoomMangage ({navigation}) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [filterdata, setFilterNewData] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const resp = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await resp.json();
    setData(data);
    setFilterNewData(data);
  };
  useEffect(() => {
    fetchData();
  },[]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter((item) => {
        //const itemData = item.name? item.name.toUpperCase() : ''.toUpperCase();
        const itemData = item.title? item.title.toUpperCase() : ''.toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterNewData(newData);
      console.log('newData',filterdata);
      
    }
    else{
      setFilterNewData(data);
    }
    
  };

  const renderRoomItem = ({ item }) => <RoomItem item={item} navigation={navigation}/>;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.roomlistscreen}>
        <Searchbar style= {styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
      <View style={styles.container}>
        {data.length === 0 ? (
          <View>
            <Text style={{ color: 'orange' }}>Chưa có phòng trọ</Text>
          </View>
        ) : (
          <FlatList
            data={filterdata}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  roomlistscreen: {
    flex: 1,
    flexDirection: 'column',
  },
  searchbar:{
    width: '90%',
    borderRadius: 5,
    height: 40,
    marginLeft: '6%',
    paddingVertical: 10,
    marginVertical: 10,
     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});