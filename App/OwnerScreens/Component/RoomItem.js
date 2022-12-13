import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,

} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo-linear-gradient';

import RoomDetailO from '../roomDetailO.js'

const RoomItem = ({item}) => {  
    const gotoRoomDetail = () =>{
        Actions.roomDetailO(item)
    }
    
    return(
        <View style={styles.RoomItem}>
            <TouchableOpacity
                onPress={() => gotoRoomDetail()}
                style = {styles.itemImg}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/red.png')} />
                <FontAwesome5 style={{ position: 'absolute' }} name='times-circle' size={18} color='white' solid />
            </TouchableOpacity>
            <View style = {styles.RoomItemText}>
                <Text style ={styles.textContain}>
                    {item.name}
                </Text>
                <Text style ={styles.textContain}>
                    Giá phòng: {item.name} đ
                </Text>
                <Text style ={styles.textContain}>
                    Khách thuê: {item.num}/{item.num}
                </Text>
                <Text style ={styles.textContain}>
                    Thuê từ: {item.time}
                </Text>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    RoomItem: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#eeeeee',
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		width: '88%',
		marginLeft: '6%',
		borderRadius: 10,
		marginBottom: 10
	},
    itemImg: {
        width: 70,
		height: 70,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
    },
    RoomItemText: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#eeeeee',
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		height: '120',
		marginBottom: 10,
        marginTop: 10
	},
    textTitle: {
		width: '90%',
		fontSize: 20,
        color: '#660B8E',
	},
    textContain: {
		width: '90%',
		fontSize: 15,
        color: '660B8E'
	},

})


