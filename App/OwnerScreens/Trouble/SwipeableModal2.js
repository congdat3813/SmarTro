import React, { Fragment, Component } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

class SwipeableModal2 extends Component {
  state = {
    visible: false
  };

  openModal = () => this.setState({ visible: true });
  closeModal = () => this.setState({ visible: false });

  render() {
    return (
      <Fragment>
        <Modal
          isVisible={this.state.visible}
          backdropOpacity={0.3}
          swipeDirection="left"
          onSwipeComplete={this.closeModal}
          onBackdropPress={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.description}>
            Sự cố sẽ được chuyển sang trạng thái “Đã xử lý”!
            </Text>
            <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={this.closeModal}
            >
              
                <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Đồng ý</Text>
                
            </Pressable>
            <Pressable
              onPress={this.closeModal}
            >
              
                <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold', marginHorizontal: 60}}>Hủy</Text>
                
            </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
        onPress={this.openModal}
        style={styles.button}>
    <Text style={{color: 'white', fontSize: 16,  fontWeight: 'bold'}}>Đã xử lý</Text>
  </Pressable>    
      </Fragment>
    );
  }
}

export default SwipeableModal2;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    marginVertical: 345,
    paddingHorizontal: 10
  },
  description: {
    // padding: 20,
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#0BA108",
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
});
