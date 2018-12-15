import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { DrawerContainer } from "./src/navigators/Drawer";
export default class App extends Component{
  render() {
    return <SwitchContainer/>;
  }
}

const SwitchNavigator = createSwitchNavigator({
  Auth: DrawerContainer
})

const SwitchContainer = createAppContainer(SwitchNavigator)