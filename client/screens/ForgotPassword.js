import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';

export default function ForgotPassword (props) {
    
const[email, setEmail] = useState('');


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
            placeholder = "Email..."
            placeholderTextColor = "white"
            onChangeText = {text => setEmail(text)}/>
            </View>
            <TouchableOpacity style={styles.send_emailBtn} onPress={()=>props.navigation.navigate("InsertPin")}>
            <Text style={styles.textButton}>Send Email</Text>
            </TouchableOpacity>

            </View>
        )
    }


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#292768',
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
        backgroundColor: "#7D3EE7",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        fontFamily:'serif'
    },

    inputText:{
        height: 50,
        color: "white",
        fontFamily:'serif'
    },

    textButton:{
        color: "white",
        marginTop: 15,
        fontFamily:'serif'
    },

    send_emailBtn:{
        width: "80%",
        backgroundColor: "#BB59FA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10
   
    },
})