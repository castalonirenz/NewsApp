import { createStackNavigator, createAppContainer } from "react-navigation";
import PHNewsScreen from "../screens/PHNewsScreen";

const Home = createStackNavigator({
    PHScreen:{
        screen: PHNewsScreen
    }
},{
    defaultNavigationOptions:{
        headerTintColor:"#FFF",
        headerStyle:{
          backgroundColor:"#67CC9C"
        }
    }
})
export const HomeContainer =createAppContainer(Home)