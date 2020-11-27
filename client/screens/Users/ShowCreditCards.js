import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { connect } from "react-redux";
import { getCreditCards, deleteCard } from './../../Store/actions/cards'




const ShowCreditCards = ({ navigation }) => {

    const dispatch = useDispatch()
    const usuario = useSelector(store => store.user)
    const cards = useSelector(store => store.card)
    const handleCard = () => {

        navigation.navigate('CreditCard')
    }

    const desvincularTarjeta = (i) => {

        Alert.alert(
            "Alerta",
            "Do you like to unlink this card?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteCard(i) }
            ],
            { cancelable: false }
        );



    }

    useEffect(() => {
        usuario.user ? dispatch(getCreditCards(usuario.user.id)) : null
    }, [])

    // useEffect(() => {
    //    console.log('state-------------', cards)
    // }, [cards])

    return (

        <View style={style.container}>

             <View style={style.banner}>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <FontAwesome5
                            style={style.head}
                            name="credit-card"
                            color="#FFF"
                            size={25}
                        />

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={style.text}>My Cards</Text>
                    </View>
                </View> 
                <FlatList
                    data={cards?cards.cards: ''}
                    inverted
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.subbox1} >
                                <TouchableOpacity>
                                    <Image
                                        source={require('./../images/card-front3.png')}
                                        resizeMode={"cover"}
                                        scale={0.3}
                                        style={{ width: 75, height: 45, borderRadius: 10, marginLeft: '10%' }}
                                    />
                                </TouchableOpacity>
                                <View>
                                <Text style={{ fontSize: 16, color: '#F6F2FC', marginVertical: '2%', fontWeight: 'bold', marginLeft: 10, fontFamily: 'serif' }}>{'... ' + item.cardNumber.substring(10, 19)}</Text>
                                <Text style={{ fontSize: 16, color: '#F6F2FC', marginHorizontal: '0.5%', marginVertical: '5%', fontWeight: 'bold', paddingLeft: 10 }}>{item.cardName.substring(0, 7) + '...'}</Text>
                                <Text style={{ fontSize: 16, color: '#F6F2FC', marginHorizontal: '0.5%', marginVertical: '5%', fontWeight: 'bold', paddingLeft: 10 }}>{item.type}</Text>

                                </View>
                    
                                <TouchableOpacity onPress={() => desvincularTarjeta(i)}>

                                    <Foundation
                                        style={style.button3}
                                        name="trash"
                                        color="#FFF"
                                        size={15}
                                    />
                                </TouchableOpacity>

                            </View>
                        )
                    }}
                />


                {cards.cards ? <View style={style.box2}>
                </View> :

                    <View style={style.subbox} >
                        <Text style={{ fontSize: 18, color: '#f6f2fc', fontFamily: 'serif' }}>No linked card</Text>

                    </View>

                }

            </View>

             <View style={{ flex: .15, backgroundColor: '#292768' }}>

                <TouchableOpacity style={style.button2} onPress={handleCard}>
                    <Feather
                        name="arrow-up-circle"
                        color="#FFF"
                        size={25}
                    />


                    <Text style={{ fontSize: 16, color: '#f6f2fc', fontWeight: 'bold', marginLeft: 25, fontFamily: 'serif' }}>Link a Card</Text>
                </TouchableOpacity>


            </View> 

        </View>

    )
}
export default ShowCreditCards;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2333',
        // marginTop: '15%'
    },
    banner: {
        height: 250,
        flex: .85,//el componente crece de arriba hacia abajo con el espacio disponible

    },
    box2: {
        marginTop: '15%'
        // flexDirection: 'row',

        // flexDirection:'row',
        // alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100
    },
    link: {
        marginHorizontal: '3%'
    },
    box3: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    box4: {
        flex: 1,
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    subbox: {
        flexDirection: 'row',
        backgroundColor: '#292768',
        fontFamily: 'serif',
        alignItems: 'center',
        height: 80,
        justifyContent: 'center',
        marginTop: 60,
        marginHorizontal: '3%',
        marginVertical: '3%',
        borderWidth: 1,
        borderColor: '#BB59FA',
        borderRadius: 8
    },
    subbox1: {
        flexDirection: 'row',
        backgroundColor: '#292768',
        fontFamily: 'serif',
        alignItems: 'center',
        height: 100,
        justifyContent: 'space-around',
        marginHorizontal: '5%',
        marginVertical: '3%',
        borderWidth: 1,
        borderColor: '#BB59FA',
        borderRadius: 8
    },
    subbox2: {
        flexDirection: 'row',
        backgroundColor: '#F4EDE2',

        alignItems: 'center',
        alignSelf: 'center',
        height: 80,
        justifyContent: 'center',
        marginTop: '15%',
        marginHorizontal: '15%',
        marginVertical: '13%',
        borderWidth: 1,
        borderColor: '#CFC9C0',
        borderRadius: 8
    },

    text1: {
        fontSize: 20,
        color: 'black',

    },
    icon: {
        marginVertical: '10%',
        marginHorizontal: '22%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginHorizontal: '8%',
        marginTop: 40,
        marginLeft: 5,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    head: {
        width: 50,
        height: 50,
        marginTop: 45

    },
    button1: {
        width: 65,
        height: 65,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        borderRadius: 8,
    },
    button2: {
        flexDirection: 'row',
        marginTop: '5%',
        marginHorizontal: '20%',
        alignSelf: 'center',
        color: '#FFF',
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button3: {
        margin: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#7D3EE7',
        color: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }



})


