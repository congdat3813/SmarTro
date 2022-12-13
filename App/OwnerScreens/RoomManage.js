import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import { Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import RoomItem from './Component/RoomItem.js'

const RoomStack = createStackNavigator();

const ORoomMangage = props => {
    const [filterdata, setFilterNewData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    const [datalist, setDatalist] = useState([]);

    const user = auth().currentUser;
    let temp_data = [];

    const onChangeSearch = query => {
      setSearchQuery(query);
      if(query) {
        const newData = datalist.filter(item => {
          const itemData = item.name? item.name.toUpperCase() : ''.toUpperCase()
          const textData = query.toUpperCase();
          return itemData.indexOf(TextData) > -1;
        })
        setFilterNewData(newData);
      }
      setFilterNewData(data);
    }

    const goBack = () => {
      Actions.pop();
    };

    const fetch = async () =>{
      try {
          let response = await fetch('link/'+ user.uid+ '/room');
          let json = await response.json();
          setDatalist(json.data);
        } catch (error) {
          console.error(error);
        }
    }
    useEffect(() => {
      const backAction = () => {
        Actions.pop();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []);

    useEffect(() => {
      fetch();
      // return () => ''
    },[]);
  
    const renderRoomItem = ({item}) => <RoomItem item={item} />;
    const [modalVisible, setModalVisible] = useState(false);

    return(
      <SafeAreaView style = {styles.roomlistscreen}>
        <LinearGradient
          colors={['#F6E8C3', '#D8BBE2']}
          style= {styles.linear}
        />
        {/* <RoomStack.Navigator
          screenOptions={{
            headerLeft: (props) => (
              <HeaderBackButton {...props} onPress={navigation.goBack} />
            ),
            headerRight: (props) => (
              <HeaderBackButton {...props} onPress={navigation.goBack} />
            ),
          }}
        /> */}
        <Searchbar style= {styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
        <View style={styles.container}>
        {datalist.length == 0 ? (
          <View>
            <Text style={{color: 'orange'}}>Chưa có phòng trọ</Text>
          </View>
        ) : (
          <FlatList
            data={datalist}
            renderItem={renderRoomItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  roomlistscreen: {
    flex: 1,
  },
  linear:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
    height: 65,
    backgroundColor: 'rgba(47,128,237,0.75)',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  searchbar: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    marginLeft: 15,
    paddingLeft: 25,
    width: '75%',
    borderRadius: 17,
    fontSize: 15,
  },

  container: {
    height: Dimensions.get('window').height - 65,
  },
});