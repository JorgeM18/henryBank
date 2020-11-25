import React from 'react'
import {useDispatch} from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CreditCard from '../src/componentes/CreditCard';




const CreditCardView = () => {
    const validarTarjeta=() =>{
        Alert.alert('algo')
    }
   
    return (
     
        <View style={style.container}>
                    
            {/* <View style={style.banner}> */}
                <View style={{alignItems:'flex-end', marginHorizontal:'1%', marginTop: '5%', flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                            <Foundation
                                                style={style.icon}
                                                name="credit-card"
                                                color="#FFF"
                                                size={25}
                                            />
                    </View>
                    <View>
                            <TouchableOpacity style={style.button}
                                onPress={() => {
                                    validarTarjeta()
                                }}
                                >
                                <Text style={{ color: '#f6f2fc', fontSize: 20}}>
                                    Add a card
                                </Text>

                            </TouchableOpacity>
                           
                    </View>
                
                {/* </View> */}
            </View>

   
           
            <View style={style.box3}>
                <CreditCard  />
            </View>

            
            <View style={style.box4}>
                

            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2333',
        // height: '1%',
        // marginTop: 0
    },
    banner: {
        height: '10%',
        flex: 2,
       
    },
    box2: {
        flex: 2,
        backgroundColor: '#BB59FA',
        // flexDirection: 'row',

        // flexDirection:'row',
        // alignItems: 'center',
    },
    link:{
        marginHorizontal:'3%'
    },
    box3: {
        marginTop: '-10%',
        paddingVertical: '15%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        // flexWrap: 'wrap',
    },
    box4: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    subbox1: {
        flexDirection: 'row',
        backgroundColor: '#292768',
        
        alignItems:'center',
        height:80,
        justifyContent: 'flex-start',
        marginHorizontal:'5%',
        marginVertical:'3%',
        borderWidth:1,
        borderColor:'#BB59FA',
        borderRadius:8
    },

    text1: {
        fontSize: 20,
        color: 'black',
       
    },
    icon:{
        paddingTop: '12%',
        paddingHorizontal: '2%',
        marginVertical:'20%', 
        marginHorizontal:'8%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        // marginHorizontal: '8%',
        paddingTop:40,
        // paddingLeft: 5,
        fontWeight: 'bold'
    },
    head: {
        width: 50,
        height: 50,
        paddingLeft: 15,
        paddingTop: 18
        
    },
    button: {
        height: 50, 
        width: 150, 
        backgroundColor: '#282366', 
        borderWidth: 1,
        borderColor: '#bb59fa',
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '10%'
      },
    button2: {
        width: 130,
        height: 45,
        marginHorizontal: '10%',
        color:'#FFF',
        marginVertical: '5%',
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        alignItems: 'center'
    },

  

})

export default CreditCardView;