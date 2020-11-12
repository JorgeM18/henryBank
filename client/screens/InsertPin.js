import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import {validarPin} from '../Store/actions/user'

function InsertPin(props){
    const [pin, setPin]= useState('');
    // const [aux, setAux]=useState(false)
    const dispatch=useDispatch()
    const verificarPin=useSelector(store=>store.user.pin)
//   console.warn(verificarPin)
    const validar=()=>{
        dispatch(validarPin(pin))
        if(verificarPin){
            props.navigation.navigate("CompleteDataUser")

        }
     
    }
 
        return(
          
            <View style = {styles.container}>
            <Image source={require('./images/Logo-04.png')} style= {styles.logo}/>
            <View style= {styles.text}>
            <TextInput
            style={styles.inputText}
            placeholder = "Insert PIN"
            placeholderTextColor = "#3B8EA5"
            onChangeText = {Npin => setPin(Npin)}/>
            </View>
            <TouchableOpacity style={styles.send_emailBtn} onPress={()=>validar()}>
            <Text style={styles.textButton}>Validate Pin</Text>
            </TouchableOpacity>

            </View>
        )
    
}

export default InsertPin;

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

    send_emailBtn:{
        width: "80%",
        backgroundColor: "#f19953",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10
   
    },
})