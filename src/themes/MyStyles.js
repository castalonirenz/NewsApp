import { StyleSheet } from "react-native";

export const MyStyle = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
        backgroundColor:"#fff5cc"
    },
    headerStyle:{
        textAlign:"center",
        width:"80%",
        color:"#000"
    },
    titleStyle:{
        width:"100%",
    },
    newsPlaceHolder:{
        width:"90%",
        backgroundColor:"#fff",
        elevation: 10,
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
    },
    imagePlaceHolder:{
        marginTop: 10,
        width:"100%",
    },
    contentPlaceHolder:{
        marginTop: 20,
        width:"100%"
    },
    newsTitle:{
        fontWeight:"bold",
        color:"#000"
    },
    newsContent:{
        color:"#000"
    }


})