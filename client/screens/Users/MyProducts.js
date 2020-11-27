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
    props.navigation.navigate('Buy')
}

const handleShowCreditCards = () => {
   
   props.navigation.navigate('ShowCreditCards')
}


    return (
     
        <View style={style.container}>
                    
            <View style={style.banner}>
                            

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '3%' }}>
                                    <View>
                                        <FontAwesome5
                                                style={style.head}
                                                name="id-card-alt"
                                                color="#FFF"
                                                size={25}
                                            />

                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={style.text}>My Products</Text>
                                    </View>

                                </View>
                    

 
                            <View style={style.subbox1} >
                                    <TouchableOpacity style={style.button1} onPress={(e) => handleAccount}>
                                            <FontAwesome5
                                                style={style.icon}
                                                name="id-badge"
                                                color="#FFF"
                                                size={25}
                                            />
                                    </TouchableOpacity>
                                    <Text style={style.text2}>My Account</Text>
                            </View>


                            <View style={style.subbox1}>
                                    <TouchableOpacity style={style.button1} onPress={handleShowCreditCards}>
                                            <Foundation
                                                style={style.icon}
                                                name="credit-card"
                                                color="#FFF"
                                                size={25}
                                            />
                                    </TouchableOpacity>
                                    <Text style={style.text2}>My Cards</Text>
                            </View>

                            <View style={style.subbox1}>
                                    <TouchableOpacity style={style.button1} onPress={(e) => props.navigation.navigate('ContactsList')}>
                                            <Foundation
                                                style={style.icon}
                                                name="torsos-all"
                                                color="#FFF"
                                                size={25}
                                            />
                                    </TouchableOpacity>
                                    <Text style={style.text2}>My Contacts</Text>
                            </View>

                    

                            <View style={style.subbox1}>
                                    <TouchableOpacity style={style.button1} onPress={(e) => handleContacts()}>
                                            <FontAwesome5
                                                style={style.icon}
                                                name="gamepad"
                                                color="#FFF"
                                                size={25}
                                            />
                                    </TouchableOpacity>
                                    <Text style={style.text2}>Buy Cards</Text>
                                    
                            </View>
                           

            </View>
            <View style={{flex: .10, backgroundColor: '#292768'}}>
        
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1F2333',
        // marginTop: '-15%'
    },
    banner: {
        backgroundColor: '#1F2333',
        height: 250,
        flex: .9,//el componente crece de arriba hacia abajo con el espacio disponible
       
    },
    box2: {
        flex: 2,
        backgroundColor: '#292768',
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
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth:1,
        borderColor:'#bb59fa',
        borderRadius:8
    },


    text2: {
        fontSize: 20, 
        color: '#f6f2fc', 
        marginHorizontal: '2%', 
        marginVertical:'5%', 
        fontWeight: 'bold', 
        paddingLeft: 10,
        fontFamily: 'serif'
    },
    icon:{
        marginVertical:'10%', 
        marginHorizontal:'22%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 22,
        color: '#FFF',
        // marginHorizontal: '8%',
        marginTop:18,
        // paddingLeft: 5,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    head: {
        width: 50,
        height: 50,
        marginTop:30
        // paddingLeft: 15,
        // paddingTop: 18
        
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