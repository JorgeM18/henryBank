import React from 'react'
import {useDispatch} from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CreditCard from '../src/componentes/CreditCard';




const CreditCardView = () => {
    
const handleAccount = () => {
    Alert.alert('redirecciona a mi cuenta')
}

const handleCard = () => {
    Alert.alert('redirecciona a tarjeta')
}
const handleContacts = () => {
    Alert.alert('redirecciona a contactos')
}
   
    return (
     
        <View style={style.container}>
                    
            <View style={style.banner}>
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
                            <Text style={style.text}>Vincular una tarjeta</Text>
                    </View>
                
                </View>
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
        backgroundColor: '#1e1e1e',
        // height: '1%',
        // marginTop: 0
    },
    banner: {
        height: '10%',
        flex: 2,
       
    },
    box2: {
        flex: 2,
        backgroundColor: '#FFF',
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
        flex: 3,
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
        backgroundColor: '#F4EDE2',
        
        alignItems:'center',
        height:80,
        justifyContent: 'flex-start',
        marginHorizontal:'5%',
        marginVertical:'3%',
        borderWidth:1,
        borderColor:'#CFC9C0',
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
    button1: {
        width: 65,
        height: 65,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        borderRadius:8,
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