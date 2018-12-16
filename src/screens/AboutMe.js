import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Linking } from 'react-native';
import { MyStyle } from "../themes/MyStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { FontStyle } from "../themes/fonts";
let Name = FontStyle.NewsTitle.BigFont
let newsContent = FontStyle.NewsContent.BigFont
class AboutMe extends Component {
  componentDidMount() {
    if (Dimensions.get('screen').width <= 360) {
      Name = FontStyle.NewsTitle.smallFont
      newsContent = FontStyle.NewsContent.smallFont
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: "About Me",
    headerTitleStyle: MyStyle.headerStyle,
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ paddingLeft: 20 }}>
        <Icon
          name="md-menu"
          color={"#000"}
          size={24}
        />
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  openDialer = () => {
    Linking.openURL('tel: +639260629217')
  }
  openMail = () => {
    Linking.canOpenURL("mailto:castalonirenz@gmail.com?subject=Inquire")
      .then(Linking.openURL('mailto:castalonirenz@gmail.com?subject=Inquire'))
  }
  render() {
    return (
      <View style={MyStyle.Container}>
        <View style={styles.imageHolder}>
          <Image
            resizeMode="contain"
            style={{ height: "100%" }}
            borderRadius={100}
            source={require('../assets/me.jpg')} />
        </View>
        <View style={styles.detailsHolder}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#000", fontSize: Name }}>Renz Francis C. Castaloni</Text>
            <Text>Mobile Developer</Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="md-phone-portrait" size={30} color="#0a24ff" />
              <Text onPress={this.openDialer} style={styles.subContent}>+639260629217</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="md-mail" size={30} color="#0a24ff" />
              <Text
                onPress={this.openMail}
                style={styles.subContent}>castalonirenz@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',

  },
  detailsHolder: {
    flex: 3,
    marginTop: 20,
    width: "90%",
  },
  subContent: {
    color: "#000",
    textDecorationLine: "underline",
    marginLeft: 10,
  }
})

export default AboutMe;
