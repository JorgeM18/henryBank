import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'

export default function Buy(props){

    const handlePlay = () =>{
        props.navigation.navigate('Buy_PlayStation')
    }
    const handleSteam = () =>{
        props.navigation.navigate('BuySteam')
    }
    const handleGplay = () =>{
        props.navigation.navigate('Buy_PlayStore')
    }

    return(
        <View style={styles.MainContainer}>
            <View>
                <TouchableOpacity  onPress={(e) => handlePlay()}>
                    <Image source={require('./images/PlayStation-logo1.png')} style={styles.Imagen}/>
                    <View style={styles.Shop_Style}>
                        <Image
                        source={require('./images/PlayStation-logo1.png')}
                        style={styles.ImageIconStyle}
                        />

                        <View style={styles.SeparatorLine}/>
                        <Text style={styles.TextStyle}>BUY PLAY STATION</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View>
                <TouchableOpacity   onPress={(e) => handleSteam()}>
                    <Image source={require('./images/Steam_icono.png')} style={styles.Imagen}/>
                    <View style={styles.Shop_Style}>
                        <Image
                        source={require('./images/Steam_icono.png')}
                        style={styles.ImageIconStyle}
                        />

                        <View style={styles.SeparatorLine}/>
                        <Text style={styles.TextStyle}>BUY STEAM</Text>
                    </View> 
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity  onPress={(e) => handleGplay()}>
                    <Image source={require('./images/Logo-PlayStore.png')} style={styles.Imagen}/>
                    <View style={styles.Shop_Style}>
                        <Image
                        source={require('./images/Logo-PlayStore.png')}
                        style={styles.ImageIconStyle}
                        />

                        <View style={styles.SeparatorLine}/>
                        <Text style={styles.TextStyle}>BUY PLAY STORE</Text>
                        </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        backgroundColor: '#292768',
    },

    Imagen:{
    alignItems: 'center',
    width: 100,
    height: 100,
    marginBottom: 30,
    marginTop: 30,
    marginLeft:20
    },

   Shop_Style:{
        width: 260,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#13124E',
        borderWidth: .5,
        borderColor: '#BB59FA',
        height: 40,
        borderRadius: 5,
        margin: 5,
        marginBottom: 20
    },
    ImageIconStyle:{
        padding: 10,
        margin: 5,
        height: 30,
        width: 30,
        resizeMode: 'stretch'
    },

    TextStyle:{
        color:'#fff',
        marginBottom: 4,
        marginLeft: 20, 
    },

    SeparatorLine: {
        backgroundColor: '#BB59FA',
        width: 1,
        height: 40
    }
})
