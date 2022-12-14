import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,

} from 'react-native';

import {
    createStackNavigator,
  } from '@react-navigation/stack';


const RoomItem = ({navigation, item}) => {  
    const gotoRoomDetail = () =>{
        console.log('a');
        navigation.navigate('RoomDetailO');
        console.log('a',item)
    }
    
    return(
        <View>
            <TouchableOpacity 
                onPress={() => gotoRoomDetail()}
                style={styles.RoomItem}>
              <View style = {styles.RoomItemImg}>
              <Image
                  style={styles.Img}
                  source={{uri: item.image}} />
              </View>
            <View style = {styles.RoomItemText}>
                <Text style ={styles.textTitle}>
                    {item.title}
                </Text>
                <Text style ={styles.textContain}>
                    Giá phòng: {item.title} đ
                </Text>
                <Text style ={styles.textContain}>
                    Khách thuê: {item.title}/{item.title}
                </Text>
                <Text style ={styles.textContain}>
                    Thuê từ: {item.title}
                </Text>
            </View>
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    RoomItem: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent: 'flex-start',
		width: '90%',
		marginLeft: '6%',
		borderRadius: 15,
		marginBottom: 10,
     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
	},
    RoomItemText: {
		display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
		marginBottom: 10,
    marginLeft: 10,
		paddingHorizontal: 10,
	},
    textTitle: {
		width: '90%',
		fontSize: 20,
    color: '#660B8E',
    fontWeight: 'bold'
	},
    textContain: {
		fontSize: 15,
        color: '660B8E'
	},
  RoomItemImg: {
		display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
	},
  Img:{
    height:70,
    width: 70,
    borderRadius:15,
    paddingVertical: 10
  },
})

export default RoomItem;

