import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const deviceWindow = Dimensions.get('window')
export default function ConnectionPages(){
    return(
        <View style={styles.container}>
        <Image source ={require('./images/Logo-05.png')} style={styles.fondo}/>
       
        <TouchableOpacity style={styles.Botones}>
            <Text style={styles.textBotones}>Play Store</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.Botones}>
            <Text style={styles.textBotones}>Steam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botones}>
            <Text style={styles.textBotones}>Epic Games</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'center'
      
    },
    fondo:{
        width: 150,
   height: 200,  
    marginBottom: 40
    },
    Botones:{
        width: 240,
        backgroundColor: "#f19953",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 3
   
    },
    loginText:{
        color: "white", 
    },
   
    textBotones:{
       color: "white",
       marginTop: 15 
   }
})