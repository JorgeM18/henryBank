import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import PassMeter from 'react-native-passmeter'
import axios from 'axios';
import { connect } from "react-redux";
import { loginUser } from './../Store/actions/user'
import { URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


const deviceWindow = Dimensions.get('window')

function Login(props) {
    const [loadin, setLoading]=useState(false)
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    

    const handleSubmit = () => {
        dispatch(loginUser(state, props))
        if( loadin) {
            return(
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
              </View>
            );
          }
        

        
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >
                <View style={styles.view} >
                    <Image source={require('./images/Logo-04.png')} style={styles.logo} />
                </View>


                <View style={styles.view}>
                    {/* <Text> Open up App.js to start working on ypur app!!</Text> */}
                    <TextInput
                        style={styles.inputViewSafe}
                        placeholder="Email..."
                        keyboardType='email-address'
                        placeholderTextColor="grey"
                        onChangeText={text => setState({
                            ...state,
                            email: text
                        })} />
                </View>
                <View style={styles.view}>
                    <TextInput
                        secureTextEntry

                        style={styles.inputViewSafe}
                        maxLength={15}
                        placeholder="Password..."
                        placeholderTextColor="grey"
                        onChangeText={text => setState({
                            ...state,
                            password: text
                        })} />

                </View>
                <View style={styles.view}>
                    <TouchableOpacity >
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => {setLoading(true)
                        handleSubmit()}} >
                        <Text style={styles.loginTextBtn}>Login</Text>
                    </TouchableOpacity>
                </View>
              
            </LinearGradient>
        </ScrollView>
    );
}


export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2333',

    },
    view: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        width: 150,
        height: 200,
        marginBottom: 40
    },

    //  inputView:{
    //     width: "80%",
    //     backgroundColor: "#465881",
    //     borderRadius: 25,
    //     height: 50,
    //     marginBottom: 20,
    //     justifyContent: "center",
    //     padding: 20
    // },
    inputGroup: {
        marginTop: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width: '90%',

    },

    inputViewSafe: {
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

    inputText: {
        height: 50,
        color: "white"
    },

    forgot: {
        color: "white",
        height: 20,
        marginTop: 5
    },

    loginBtn: {
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
    loginText: {
        color: "white",
        fontFamily: 'serif'

    },

    loginTextBtn: {
        color: "white",
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})



