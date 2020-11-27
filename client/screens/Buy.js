import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'

export default function Buy(){

    return(
        <View style={styles.MainContainer}>
               <Image source={require('./images/PlayStation-logo.jpg')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.Shop_Style} activeOpacity={0.5} >
            <Image
            source={require('./images/PlayStation-logo.jpg')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>BUY PLAY STATION</Text>
            
            </TouchableOpacity>


            <Image source={require('./images/Steam_icono.png')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.Shop_Style} activeOpacity={0.5} >
            <Image
            source={require('./images/Steam_icono.png')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>BUY STEAM</Text>
            </TouchableOpacity>

            <Image source={require('./images/Logo-PlayStore.png')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.Shop_Style} activeOpacity={0.5}>
            <Image
            source={require('./images/Logo-PlayStore.png')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>BUY PLAY STORE</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        backgroundColor: '#292768',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    Imagen:{
    alignItems: 'center',
    width: 230,
    height: 200,
    marginBottom: 30,
    marginTop: 1
    },

   Shop_Style:{
        width: 260,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
        marginBottom: 20
    },
    ImageIconStyle:{
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch'
    },

    TextStyle:{
        color:'#fff',
        marginBottom: 4,
        marginLeft: 20, 
    },

    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40
    }
})
