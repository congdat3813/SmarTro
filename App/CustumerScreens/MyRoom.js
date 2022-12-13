import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MyRoom = ({item}) => { 
  const [focus, setFocus] = useState(true);
  const OnChangeTab = (newfocus) => {
    setFocus(newfocus);
  }

  return(
      <View style={styles.roomlistscreen}>
      <LinearGradient
          colors={['#F6E8C3', '#D8BBE2']}
          style={styles.linear}/>
    <View style={styles.roominfo}>
      <Image style={styles.ImgHome} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Fh_04jzrGJwzp1rvJBtG8h71t0TZKZXnvA&usqp=CAU'}}/>
    </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => OnChangeTab(true)}
          style = {focus ? styles.infoactive: styles.infoUnactive}
        >
        <Text
        style = {focus ? styles.textActive: styles.textInfoUnactive}>Thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>OnChangeTab(false)}
          style={focus? styles.cusUnactive:styles.cusactive}
        ><Text
        style={focus? styles.textCusUnactive: styles.textActive}>Khách thuê</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          focus ? (<><RoomInfo></RoomInfo><ServiceInfo></ServiceInfo></>):(<CusItem></CusItem>)
        }
      </View>
    </View>
  )
}
const RoomInfo = () =>(
  <View style={styles.roominfo}>
      <View style={styles.lineTop}>
        <Text style={styles.textRight}>Nhà</Text>
        <Text style={styles.textLeft}>Nhà Trọ Sinh Viên</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}>Chủ Trọ</Text>
        <Text style={styles.textLeft}>Hoàng Công Đạt</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}></Text>
        <Text style={styles.textLeft}>0388860708</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}>Phòng</Text>
        <Text style={styles.textLeft}>313</Text>
      </View>
  </View>
)

const ServiceInfo = () => (
    <View style={styles.roominfo}>
      <View style={styles.lineTop}>
        <Text style={styles.textRight}>Diện tích</Text>
        <Text style={styles.textLeft}>45m2</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}>Giá Phòng</Text>
        <Text style={styles.textLeft}>3.000.000đ</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}>Khách thuê</Text>
        <Text style={styles.textLeft}>45m2</Text>
      </View>
      <View style={styles.lineInfo}>
        <Text style={styles.textRight}>Thuê từ</Text>
        <Text style={styles.textLeft}>22/08/2022</Text>
      </View>
      <View style={styles.lineBot}>
        <Text style={styles.textRight}>Đối tượng</Text>
        <Text style={styles.textLeft}>Nam, Nữ</Text>
      </View>
    </View>
)

const CusItem = () =>(
  <View style={styles.cusinfo}>
  <Image  style={styles.Img} source={{uri:'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'}}></Image>
  <View>
    <Text style = {styles.textCusName}>Hoài Nhy</Text>
    <Text style = {styles.textCusInfo}>Số điện thoại: 0388860708</Text>
    <Text style = {styles.textCusInfo}>Thuê từ:../../....</Text>
  </View>
  </View>
)
const styles = StyleSheet.create({
    roomlistscreen: {
      flex: 1,
      flexDirection: 'column',
    },
    ImgHome:{
      height:200,
      paddingTop: 15,
      borderRadius: 15
    },
    linear:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
    header: {
      height: 40,
      flexDirection: 'row',
      justifyContent: "space-between",
      display: 'flex',
      margin: 10,
    },
    infoactive:{
      flex: 0.45,
      height: 40,
      backgroundColor: '#660B8E',
      borderRadius: 15,
      alignItems: 'center',
      paddingTop: 10,
    },
    infoUnactive:{
      flex: 0.45,
      height: 40,
      borderColor: '#660B8E',
      borderRadius: 15,
      borderWidth:3,
      alignItems: 'center',
      paddingTop: 8,
    },
    cusactive:{
      flex: 0.45,
      height: 40,
      backgroundColor: '#F2BF00',
      borderRadius: 15,
      alignItems: 'center',
      paddingTop: 10,
    },
    cusUnactive:{
      flex: 0.45,
      height: 40,
      borderColor: '#F2BF00',
      borderRadius: 15,
      borderWidth:3,
      alignItems: 'center',
      paddingTop: 8,
    },
    textActive:{
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    textInfoUnactive:{
      color: '#660B8E',
      fontSize: 12,
      fontWeight: '600',
    },
    textCusUnactive:{
      height: '100%',
      color: '#F2BF00',
      fontSize: 12,
      fontWeight: '600'
    },
  roominfo:{
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lineInfo:{
    height: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    margin: 5,
    marginHorizontal: 10
  },
    lineTop:{
    height: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10
  },
    lineBot:{
    height: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10
  },
  textRight:{
    fontSize: 20,
  },
  textLeft:{
    fontSize: 20,
    fontStyle: 'italic',
  },
  Img:{
    height:90,
    width:90,
    borderRadius:15,
    margin: 15,
  },
  cusinfo:{
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textCusName:{
    fontSize: 20,
    color: '#F2BF00',
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 10,
  },
  textCusInfo:{
    fontSize: 15,
    color: '#000000',
    marginTop: 10,
    marginRight: 10,
  }
  });