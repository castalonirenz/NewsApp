import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { MyStyle } from "../themes/MyStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { getNews } from "../actions/NewsData";
class PHNewsScreen extends Component {
  componentDidMount(){
    this.props.onLoadNews();
  }
  static navigationOptions = ({ navigation }) => ({
    title: "News",
    headerTitleStyle: MyStyle.headerStyle,
    headerLeft: (
        <TouchableOpacity
        onPress={()=>navigation.toggleDrawer()}
        style={{ paddingLeft: 20 }}>
          <Icon
            name="md-menu"
            color={"#FFF"}
            size={24}
          />
        </TouchableOpacity>
      ),
      })
    _openLink=(val)=>{
      Linking
      .openURL(val)
    }
  render() {
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={MyStyle.Container}>
         {console.log('pumasok sa return')}
       
      {this.props.GetNews.map((items, key)=>(
        <TouchableOpacity 
        onPress={this._openLink.bind(this, items.url)}
        key={key} style={MyStyle.newsPlaceHolder}>
        <View style={MyStyle.titleStyle}>
        <Text>{items.title}</Text>
        </View>
        <View style={MyStyle.imagePlaceHolder}>
        <Image 
        resizeMode="contain"
        style={{height:100, width:"100%"}}
        source={{uri:items.urlToImage}}/>
        </View>
        <View style={MyStyle.contentPlaceHolder}>
        <Text>{items.content}</Text>
        </View>
        </TouchableOpacity>
      ))}
     
      </View>
      </ScrollView>
    );
  }
}


const mapStateToProps = state =>{
  return{
    GetNews: state.getNews.newsData
  }
}
const mapDispatchToProps = dispatch =>{
    return{
      onLoadNews: () => dispatch(getNews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PHNewsScreen);


