import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const deviceWindow = Dimensions.get('window')
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
                 <LinearGradient
            colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            height={Dimensions.get('window').height}
        >
            <View style={styles.view}>
            <Image source={require('./images/Logo-04.png')} style= {styles.logo}/>
            </View>
            <View style={styles.view}>
            <View >
            <TextInput
            style={styles.inputText}
            placeholder = "Email..."
            placeholderTextColor = "grey"
            onChangeText = {text => setEmail(text)}/>
            </View>
            <TouchableOpacity style={styles.send_emailBtn} onPress={()=>props.navigation.navigate("RecoveryPassword")}>
            <Text style={styles.textButton}>Send Email</Text>
            </TouchableOpacity>
            </View>
         
            </LinearGradient>
            </View>
        )
    }


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f2333',
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    logo:{
        width: 150,
        height: 200,  
         marginBottom: 40
     },
     view:{
        alignItems: 'center',
        justifyContent: 'center'
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
        width: deviceWindow.width * 0.87,
        margin: 5,
        padding: 6,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: "#eceff1",
        fontFamily: 'serif',
        marginTop: 15
    },

    textButton:{
        color: "white",
        marginTop: 15,
        fontSize: 20,
        // fontWeight: 'bold',
        letterSpacing: 2
    },

    send_emailBtn:{
        width: "80%",
        height: 50,
        alignItems: 'center',
        backgroundColor: "#1f2333",
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2
        },

    },
})