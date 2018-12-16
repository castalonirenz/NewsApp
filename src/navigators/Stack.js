import { createStackNavigator, createAppContainer } from "react-navigation";
import PHNewsScreen from "../screens/PHNewsScreen";
import AboutMe from "../screens/AboutMe";
const Home = createStackNavigator({
    PHScreen: {
        screen: PHNewsScreen
    }
}, {
        defaultNavigationOptions: {
            headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: "#f4f0e6"
            }
        }
    })
export const HomeContainer = createAppContainer(Home)

const AboutMeStack = createStackNavigator({
    AboutMe: {
        screen: AboutMe
    }
}, {
        defaultNavigationOptions: {
            headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: "#f4f0e6"
            }
        }
    })
export const AboutMeContainer = createAppContainer(AboutMeStack)