import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import {validarPin} from '../Store/actions/user'
import { LinearGradient } from 'expo-linear-gradient';

function InsertPin(props){
     const [pin, setPin]= useState('');
    // const [aux, setAux]=useState(false)
    const dispatch=useDispatch()
    const verificarPin=useSelector(store=>store.user.pin)
//   console.warn(verificarPin)
    const validar=()=>{
        dispatch(validarPin(pin, props))
        setPin('')   
    
    }

 
        return(
            <View style={styles.container}>
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
           <Text style={styles.text_header}>Insert  PIN!</Text>
            <View style= {styles.text}>
    
            <TextInput
            style={styles.inputText}
            placeholder = ""
            keyboardType='numeric'
            defaultValue={pin}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {Npin => setPin(Npin)}/>
            </View>
            <TouchableOpacity style={styles.send_emailBtn} onPress={()=>validar()}>
            <Text style={styles.textButton}>Validate Pin</Text>
            </TouchableOpacity>
           
           </View>
           
            </LinearGradient>
            </View>
        )
    
}

export default InsertPin;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f2333',
        
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical:20,
        fontFamily:'serif'
    },
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
        width: 150,
        height: 200,  
         marginBottom: 40,
        
     },

    text:{
        width: "85%",
        backgroundColor: "#465881",
        borderRadius:10,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText:{
        height: 50,
        color: "white",
        fontFamily:'serif'
    },

    textButton:{
        color: "white",
        fontSize:20,
        marginVertical:10,
        fontFamily:'serif',
        letterSpacing:2
    },

    send_emailBtn:{
        width: "70%",
        height: 50,
        alignItems: 'center',
        backgroundColor: "#7847e5",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10
   
    },
})