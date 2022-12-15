import React, { Fragment, Component, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
};
postData('https://example.com/answer', {  });

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
            <Text style={styles.description}>
            Bạn có chắc muốn thêm phòng?
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
        onPress={()=>setVisible(true)}
        style={styles.button}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Thêm</Text>
        </Pressable>
      </Fragment>
    );
}

export default SwipeableModal;

const styles = StyleSheet.create({
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
  description: {
    // padding: 20,
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#660B8E",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
