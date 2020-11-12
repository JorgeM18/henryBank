import React from 'react';
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';

export default class PasswordPin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pin: "",
        }
    }
    render(){
        return(
            // <View>
            // <SafeAreaView style={styles.container}>
            // <Text style ={styles.text}>Forgot Password?</Text>
            // <FormButton/>
            // </SafeAreaView>
            // </View>
            <View style = {styles.container}>
            <Image source={require('./images/Logo-04.png')} style= {styles.logo}/>
            <View style= {styles.text}>
            <TextInput
            style={styles.inputText}
            placeholder = "pin..."
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => this.setState({pin:text})}/>
            </View>
            <TouchableOpacity style={styles.send_pinBtn} onPress={() => props.navigation.navigate("CreateUser")}>
            <Text style={styles.textButton}>My pin</Text>
            </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo:{
        width: 150,
        height: 200,  
         marginBottom: 40
     },

    text:{
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText:{
        height: 50,
        color: "white"
    },

    textButton:{
        color: "white",
        marginTop: 15
    },

    send_pinBtn:{
        width: "80%",
        backgroundColor: "#f19953",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10
   
    },
})