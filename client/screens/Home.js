import React from 'react'
import {Button, StyleSheet} from 'react-native'

import { ScrollView } from "react-native-gesture-handler";



const Home = (props) => {


    return (
        <ScrollView style={style.container}>
            <Button 
            title="Create User" 
            onPress={() => props.navigation.navigate("CreateUser")} 
            style={style.btn}/>
            
            <Button title="List User" 
            onPress={() => props.navigation.navigate("ListUser")} 
            style={style.btn}/>
            
            <Button title="Faq" 
            onPress={() => props.navigation.navigate("Faq")} />
            <Button title="Login" 
            onPress={() => props.navigation.navigate("Login")} />

            style={style.btn}/>
        </ScrollView>

    )

}

const style= StyleSheet.create({
    container:{
        flex:1,
        padding:35,
    },
    loader:{
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:"absolute",
        alignItems:"center",
        justifyContent:"center",
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderColor:"#cccccc",
    },
    btn:{
        marginBottom:7,
    },
});

export default Home;