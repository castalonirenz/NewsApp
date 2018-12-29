import React, { Component } from 'react';
import {
  View, Text, RefreshControl,
  TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Image, Linking, ActivityIndicator, Share, Animated
} from 'react-native';
import { MyStyle } from "../themes/MyStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { getNews, searchNews } from "../actions/NewsData";
import { FontStyle } from "../themes/fonts";
import { Input } from "../components/textInput";
import { Header, Left, Right } from "native-base";
import { ActionButtonStyles } from "../themes/ActionButton";
let newsTitle = FontStyle.NewsTitle.BigFont
let newsContent = FontStyle.NewsContent.BigFont
import { HeaderStyle } from "../themes/HeaderStyle";
import { ActionButton } from "../components/actionButton";
let HEADER_MAX_HEIGHT = 50;// set the initial height
let HEADER_MIN_HEIGHT = 0;// set the height on scroll
let HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class PHNewsScreen extends Component {
  state = {
    isConnected: true,
    Search: "",
    refreshing: false,
    scrollY: new Animated.Value(0),
    scrolling: false,
  }
  componentDidMount() {
    if (Dimensions.get('screen').width <= 360) {
      newsTitle = FontStyle.NewsTitle.smallFont
      newsContent = FontStyle.NewsContent.smallFont
    }
    this.props.onLoadNews();
  }
  static navigationOptions = {
    header: null
  }
  _openLink = (val) => {
    Linking
      .openURL(val)
  }

  _onShare(title, content, image, url) {
    Share.share({
      message: "Headline: " + title + " " + "Content: " +
        content + " " + "Image:" + image + " " + "Url: " + url,
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
  _onRefresh = () => {
    if (this.state.Search === "") {
      this.setState({ refreshing: true });
      this.props.onLoadNews()
      this.setState({ refreshing: false })
    }
    else if (this.state.Search !== "") {
      this.setState({ refreshing: true });
      this.props.onSearchNews(this.state.Search)
      this.setState({ refreshing: false })
    }
  }
  _goToTop = () => {
    this.refs.ScrollView_Reference.scrollTo({ animated: true }, 0)
  }
  _onSearch = () => {
    this.props.onSearchNews(this.state.Search);
  }
  render() {
    let loading;
    let SearchLoading;
    if (this.props.isLoading) {
      loading = <ActivityIndicator size={30} color="gray" />;
    }
    else if (!this.props.isLoading) {
      SearchLoading =
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={this._onSearch}>
          <Icon name="md-search" size={30} color="#313235" />
        </TouchableOpacity>
    }
    const showActionButton = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',

    });
    const scrollDown = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.MainContainer}>
        <Animated.View style={{ height: scrollDown }}>
          <Header style={HeaderStyle.style}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}>
                <Icon
                  name="md-menu"
                  color={"#fff"}
                  size={30}
                />
              </TouchableOpacity>
              <View style={styles.searchHolder}>
                <Input
                  onChangeText={(Text) => this.setState({ Search: Text })}
                  value={this.state.Search}
                  placeholder="Search Anything"
                >
                </Input>
                {SearchLoading}
                {loading}
              </View>
              <TouchableOpacity
                onPress={() => alert('Please be patient :)')}>
                <Icon
                  name="md-list"
                  color={"#fff"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </Header>
        </Animated.View>
        <ScrollView
          ref='ScrollView_Reference'
          scrollsToTop={this.state.goToTop}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={MyStyle.Container}>
            {console.log('pumasok sa return')}
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={this._onShare.bind(this, items.title, items.content, items.urlToImage, items.url)}
                      style={styles.iconHolder}>
                      <Icon name="md-share" size={40} color="#43bcff" />
                    </TouchableOpacity>
                    <Text style={[MyStyle.newsContent, { fontSize: newsContent, color: "#43bcff" }]}>Share this Article</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={this._openLink.bind(this, items.url)}
                      style={styles.iconHolder}>
                      <Icon name="md-book" size={40} color="#24978d" />
                    </TouchableOpacity>
                    <Text style={[MyStyle.newsContent, { fontSize: newsContent, color: "#24978d" }]}>Open this Article</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Animated.View style={[ActionButtonStyles.Container, { height: showActionButton }]}>
          <ActionButton
            Touch={this._goToTop}
            name="md-arrow-up"
            size={30}>
          </ActionButton>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },
  iconHolder: {
    marginTop: 10,
    width: 40
  },
  searchHolder: {
    width: "70%",
    height: 40,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
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


