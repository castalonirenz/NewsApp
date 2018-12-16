import {
    createDrawerNavigator,
    createAppContainer,
    DrawerItems
  } from "react-navigation";
  import React, { Component } from "react";
  import {
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity
  } from "react-native";
import PHNewsScreen from "../screens/PHNewsScreen";
import { HomeContainer, AboutMeContainer } from "./Stack";
  const CustomDrawerComponent = props => (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/DrawerHeader.jpg")}
        resizeMode="stretch"
        style={{
          height: 150,
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* <Image
          resizeMode="contain"
          style={{ height: "50%", width: "50%" }}
          source={require("../../assets/yonduSmall.png")}
        /> */}
      </ImageBackground>
      <ScrollView>
        <DrawerItems 
        {...props} />
      </ScrollView>
    </SafeAreaView>
  );
  
  const FirstRouteDrawer = createDrawerNavigator(
    {
      'Home': {
        screen: HomeContainer
      },
      "About Me":{
        screen: AboutMeContainer
      }
    },
    {
      contentComponent: CustomDrawerComponent,
      contentOptions: {
        activeTintColor: "#298F78",
        inactiveTintColor:"#969797",
        labelStyle: {
          fontSize: 15,
          fontWeight:"normal"
        }
      }
    }
  );
  
  export const DrawerContainer = createAppContainer(FirstRouteDrawer);