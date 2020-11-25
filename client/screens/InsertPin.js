import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import {validarPin} from '../Store/actions/user'
import CodeInput from 'react-native-confirmation-code-input'

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
          
            <View style = {styles.container}>
            <Image source={require('./images/Logo-04.png')} style= {styles.logo}/>
            <Text style={styles.text_header}>Insert  PIN!</Text>
            <View style= {styles.text}>
    
            {/* <TextInput
            style={styles.inputText}
            placeholder = ""
            keyboardType='numeric'
            defaultValue={pin}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {Npin => setPin(Npin)}/> */}
            <CodeInput
            useRef="codeInputRef2"
            keyboardType="numeric"
            codeLength={6}
            className = 'border-box'
            compareWithCode='123456'
            autoFocus={false}
            codeInputStyle={{fontWeight: '800'}}
            // onFulfill={(isValid, code)=> _onFinishCheckingCode2(isValid, code)}
            onChangeText={Npin =>setPin(Npin)}
            />
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
        backgroundColor: '#292768',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical:20,
        fontFamily:'serif'
    },
    logo:{
        width: 150,
        height: 200,  
         marginBottom: 40
     },

    text:{
        // width: "80%",
        // backgroundColor: "#465881",
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
        fontSize:20,
        marginVertical:10,
        fontFamily:'serif'
    },

    send_emailBtn:{
        width: "80%",
        backgroundColor: "#1f2333",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 60,
        marginBottom: 10
   
    },
})