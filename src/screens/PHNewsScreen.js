import React, { Component } from 'react';
import { View, Text, NetInfo, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Linking, ActivityIndicator, Share } from 'react-native';
import { MyStyle } from "../themes/MyStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { getNews, searchNews } from "../actions/NewsData";
import { FontStyle } from "../themes/fonts";
import { Input } from "../components/textInput";
let newsTitle = FontStyle.NewsTitle.BigFont
let newsContent = FontStyle.NewsContent.BigFont
let SearchValue
class PHNewsScreen extends Component {
  state = {
    isConnected: true,
    Search: "",
  }
  componentDidMount() {
    if (Dimensions.get('screen').width <= 360) {
      newsTitle = FontStyle.NewsTitle.smallFont
      newsContent = FontStyle.NewsContent.smallFont
    }
    this.props.onLoadNews();
  }


  static navigationOptions = ({ navigation }) => ({
    title: "News",
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
  _openLink = (val) => {
    Linking
      .openURL(val)
  }

  _onShare(title, content, image, url) {
    Share.share({
      message: "Headline: " + title + " " + "Content: " + content + " " + "Image:" + image + " " + "Url: " + url,
      url: url,
      title: title
    }, {
        // Android only:
        dialogTitle: 'Share News',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }

  _onSearch = () => {
    this.props.onSearchNews(this.state.Search);
  }

  render() {
    let loading;
    let Search;
    if (this.props.isLoading) {
      loading = <ActivityIndicator size={50} color="gray" />;
    }
    else if (!this.props.isLoading) {
      Search =
        <View style={styles.searchHolder}>
          <Input
            onChangeText={(Text) => this.setState({ Search: Text })}
            value={this.state.Search}
            placeholder="Search Anything"
          >
          </Input>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={this._onSearch}>
            <Icon name="md-search" size={40} color="#313235" />
          </TouchableOpacity>
        </View>

    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={MyStyle.Container}>
          {console.log('pumasok sa return')}
          {Search}
          {loading}
          {this.props.GetNews.map((items, key) => (

            <View
              key={key} style={MyStyle.newsPlaceHolder}>
              <View style={MyStyle.titleStyle}>
                <Text style={[MyStyle.newsTitle, { fontSize: newsTitle }]}>{items.title}</Text>
              </View>
              <View style={MyStyle.imagePlaceHolder}>
                <Image
                  resizeMode="contain"
                  style={{ height: 200, width: "100%" }}
                  source={{ uri: items.urlToImage }} />
              </View>
              <View style={MyStyle.contentPlaceHolder}>
                <Text style={[MyStyle.newsContent, { fontSize: newsContent }]}>{items.content}</Text>
              </View>
              <View>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity
                  onPress={this._onShare.bind(this, items.title, items.content, items.urlToImage, items.url)}
                  style={styles.iconHolder}>
                  <Icon name="md-share" size={40} color="#43bcff" />
                </TouchableOpacity>
                <Text style={[MyStyle.newsContent, { fontSize: newsContent, color:"#43bcff" }]}>Share this Article</Text>
                </View>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity
                  onPress={this._openLink.bind(this, items.url)}
                  style={styles.iconHolder}>
                  <Icon name="md-book" size={40} color="#24978d" />
                </TouchableOpacity>
                <Text style={[MyStyle.newsContent, { fontSize: newsContent, color:"#24978d" }]}>Open this Article</Text>
                </View>
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconHolder: {
    marginTop: 10,
    width: 40
  },
  searchHolder: {
    marginTop: 20,
    width: "70%",
    height: 50,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
  }
})

const mapStateToProps = state => {
  return {
    GetNews: state.getNews.newsData,
    isLoading: state.activityIndicator.isLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLoadNews: () => dispatch(getNews()),
    onSearchNews: (searchData) => dispatch(searchNews(searchData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PHNewsScreen);


