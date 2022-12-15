import React, { Fragment, Component } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

class SwipeableModal extends Component {
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
            Lưu bài đăng thành công!
            </Text>
            <Pressable
              onPress={this.closeModal}
              style={styles.ok}
            >
                <Text style={{color: '#660B8E', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </Pressable>
          </View>
        </Modal>

        <Pressable
      onPress={this.openModal}
        style={styles.button}>
          <Text style={{color: 'white', fontSize: 16,  fontWeight: 'bold'}}>Lưu bài đăng</Text>
        </Pressable>
      </Fragment>
    );
  }
}

export default SwipeableModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    marginHorizontal: 30,
    marginVertical: 360
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
  ok: {
    // width: 50,
    // height: 50,
    // backgroundColor: "#660B8E",
    // borderRadius: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'flex-end',
    // marginRight: 20,
    // margin: 20
  },
});
