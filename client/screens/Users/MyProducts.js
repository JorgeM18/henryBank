import React from 'react'
import {useDispatch} from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import {logout} from '../../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';




const MyProducts = (props) => {
    
const handleAccount = () => {
    Alert.alert('redirecciona a mi cuenta')
}

const handleContacts = () => {
    Alert.alert('redirecciona a contactos')
}

const handleShowCreditCards = () => {
   
   props.navigation.navigate('ShowCreditCards')
}


    return (
     
        <View style={style.container}>
                    
            <View style={style.banner}>
                <View style={{alignItems:'flex-end', marginHorizontal:'3%', marginTop: '5%'}}>
                
           
                </View>
                <View style={{ paddingHorizontal: 14 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 10, color: '#fff', opacity: 0.6, marginTop: 2, marginHorizontal: 17 }}></Text>
                            <FontAwesome5
                                    style={style.head}
                                    name="id-card-alt"
                                    color="#FFF"
                                    size={30}
                                />

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={style.text}>My Products</Text>
                        </View>

                    </View>
                </View>
            </View>

            <View style={style.box2}>
                <View style={style.subbox1} >
                        <TouchableOpacity style={style.button1} onPress={(e) => handleAccount}>
                                <FontAwesome5
                                    style={style.icon}
                                    name="id-badge"
                                    color="#FFF"
                                    size={30}
                                />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#f6f2fc', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>My Account</Text>
                </View>
            </View>

            <View style={style.box2}>
                <View style={style.subbox1}>
                        <TouchableOpacity style={style.button1} onPress={handleShowCreditCards}>
                                <Foundation
                                    style={style.icon}
                                    name="credit-card"
                                    color="#FFF"
                                    size={30}
                                />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#f6f2fc', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>My Cards</Text>
                </View>
            </View>

            <View style={style.box2}>
                <View style={style.subbox1}>
                        <TouchableOpacity style={style.button1} onPress={(e) => props.navigation.navigate('ContactsList')}>
                                <Foundation
                                    style={style.icon}
                                    name="torsos-all"
                                    color="#FFF"
                                    size={30}
                                />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#f6f2fc', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>My Contacts</Text>
                </View>
            </View>
           
            <View style={style.box2}>
                <View style={style.subbox1}>
                        <TouchableOpacity style={style.button1} onPress={(e) => handleContacts()}>
                                <FontAwesome5
                                    style={style.icon}
                                    name="plus"
                                    color="#FFF"
                                    size={30}
                                />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#f6f2fc', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>More...</Text>
                </View>
            </View>

            
            <View style={style.box4}>
                

            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1d5e',
        marginTop: '-15%'
    },
    banner: {
        backgroundColor: '#282366',
        height: 250,
        flex: 2,//el componente crece de arriba hacia abajo con el espacio disponible
       
    },
    box2: {
        flex: 2,
        backgroundColor: '#282366',
        // flexDirection: 'row',

        // flexDirection:'row',
        // alignItems: 'center',
    },
    link:{
        marginHorizontal:'3%'
    },
    box3: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    box4: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    subbox1: {
        flexDirection: 'row',
        backgroundColor: '#1f1d5e',
        
        alignItems:'center',
        height:80,
        justifyContent: 'flex-start',
        marginHorizontal:'5%',
        marginVertical:'3%',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth:1,
        borderColor:'#bb59fa',
        borderRadius:8
    },

    text1: {
        fontSize: 20,
        color: 'black',
       
    },
    icon:{
        marginVertical:'10%', 
        marginHorizontal:'22%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginHorizontal: '8%',
        paddingTop:40,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    head: {
        width: 50,
        height: 50,
        paddingLeft: 15,
        paddingTop: 18
        
    },
    button1: {
        width: 55,
        height: 50,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#7d3ee7',
        justifyContent: 'center',
        borderRadius:40,
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

export default MyProducts;