import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View, Image, Button, Alert, TextInput } from "react-native";
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import SwipeableModal from "./SwipeableModal";
import Modal from "react-native-modal";


const rooms = [
  { label: "101", value: "101" },
  { label: "102", value: "102" },
  { label: "103", value: "103" },
  { label: "201", value: "201" },
  { label: "202", value: "202" },
  { label: "203", value: "203" },
];

const AddService = ({ navigation }) => {
  const { handleSubmit, control } = useForm();
  const [roomOpen, setRoomOpen] = useState(false);
  const [roomValue, setRoomValue] = useState(null);
  const [room, setRoom] = useState(rooms);
  const onRoomOpen = useCallback(() => {
    setTypeOpen(false);
  }, []);

  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [type, setType] = useState(rooms);
  const onTypeOpen = useCallback(() => {
    setRoomOpen(false);
  }, []);

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
              Bạn có chắc muốn thêm dịch vụ?
              </Text>
              <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={()=>setVisible(false)}
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
          onPress={()=> {setVisible(true);}}
          style={styles.modalButton}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Thêm</Text>
          </Pressable>
        </Fragment>
      );
  }

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
        navigation.navigate('Services')
      }
    >
      <FontAwesome5 name='chevron-left' size={30} color='black' style={{marginLeft: 15}}/>
    </Pressable>
    </View>
          <Text style={styles.headerText}>Thêm dịch vụ</Text>
        </View>
        <View style={styles.body}>
        <Text style={styles.header}>Phòng</Text>
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

<Text style={styles.header}>Loại dịch vụ</Text>
<Controller
        name="type"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownType}>
            <DropDownPicker
              style={styles.dropdown}
              open={typeOpen}
              value={typeValue} //typeValue
              items={type}
              setOpen={setTypeOpen}
              setValue={setTypeValue}
              setItems={setType}
              placeholder="Chọn loại dịch vụ"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onTypeOpen}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />

<Text style={styles.header}>Giá</Text>
<Controller
        name="price"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

<Text style={styles.header}>Chi tiết</Text>
<Controller
        name="detail"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

        <SwipeableModal />

        {/* <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        value=""
      /> */}

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
    width: "100%",
    marginBottom: 20
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontStyle: "italic",
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
    marginRight: 15
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
    marginBottom: 15
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
    marginBottom: 20
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#071D92",
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
    padding: 15,
    marginBottom: 20
  },
  priceInput: {
    height: 50,
    width: 170,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 15,
    marginBottom: 20
  },
  dropdownRoom: {
    zIndex: 20,
    borderWidth: 0,
    borderRadius: 16,
  },
  dropdownType: {
    zIndex: 10,
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
  modalButton: {
    width: 370,
    height: 50,
    backgroundColor: "#071D92",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default AddService;
