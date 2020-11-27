import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { logout, getDataUser } from '../../Store/actions/user'
import { getBalance, getAccount } from '../../Store/actions/account'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts'
import { postContacts } from '../../Store/actions/contact'
import { incomeOutcome, ResetTransacctions } from '../../Store/actions/transactions'
import backgroundImage from '../../assets/Logo_Background.png';
import colorLogo from '../../assets/Logo-15.png';


const ProfileUser = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    const [balanc, setBalanc] = useState('')
    const balance = useSelector(store => store.balance)
    const userStore = useSelector(store => store.user.user)
    const inc_out = useSelector(store => store.transaction.income_outcome)

    console.log('USUARIO STORE', userStore)
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            setUser((JSON.parse(usuario)))

            // var tok = await AsyncStorage.getItem('token')
            // setToken((JSON.parse(tok)))
            // console.log('token',token)

        } catch (error) {
            // console.log(error)


        }

    }


    useEffect(() => {
        onLoad()

        userStore ? dispatch(getBalance(userStore.id)) : null
        userStore ? dispatch(incomeOutcome(userStore.id, 1)) : null
        userStore ? dispatch(getAccount(userStore.id)): null
        // eject()

    }, []);

    /* const eject = ( () => {
        const { status } =  Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } =  Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            //me guardo el id del usuario logueado para usar de referencia
            //const userId = user.user['content'][1][0].id 
            const userId = user.data.id
            //compruebo que haya data y la filtro, generando un array de contactos prolijo
            if (data.length > 0) {
                const contacts = data;
                //console.log(contacts)

                let newContacts = []
                for (let i = 0; i < contacts.length; i++) {
                    if (contacts[i]["phoneNumbers"]) {
                        let add = { userId: userId, alias: contacts[i]["name"], contactPhone: contacts[i]["phoneNumbers"][0].number }
                        newContacts.push(add)
                        //console.log(add)
                    }
                }
                dispatch(postContacts(newContacts))
            }
        }
    }); */


    const goProducts = () => {
        props.navigation.navigate('MyProducts')
    }
    const goContacts = () => {
        props.navigation.navigate('ContactsList')
    }
    //  console.log('nuevo balance',balanc)
    return (

        <View style={style.container}>
            <ImageBackground
                source={backgroundImage}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={style.banner}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: '3%', height: '20%' }}>
                        {/* <TouchableOpacity onPress={() => Logout()}>
                            <Feather
                                name='menu'
                                color='#BB59FA'
                                size={30}
                            />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ paddingHorizontal: 14, flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <View style={style.profile}>
                                <View style={style.contImage}>
                                    <Image
                                        source={user ? { uri: user ? user.data.image : '' } : require('../images/favicon.png')}
                                        style={style.Image}
                                    />
                                </View>
                                <Text style={{ fontSize: 16, color: '#FFF', opacity: 0.9, marginTop: 2 }}>{user ? `${user.data.name} ${user.data.lastname}` : ''}</Text>
                                <Text style={{ fontSize: 12, color: '#FFF', opacity: 0.5 }}>(Go-banker Lvl. 1)</Text>
                            </View>
                            <View style={style.contBalance}>
                                <Text style={style.balance}>${balance.balance.balance}.00</Text>
                                <Text style={{ fontSize: 16, color: '#fff', opacity: 0.5 }}>(Go-wallet)</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={style.contSummary}>
                    <View style={style.summaryBox}>
                        <View style={style.contSummaryLogo}>
                            <Image
                                source={colorLogo}
                                style={style.summaryLogo}
                            />
                        </View>
                        <View style={style.incomeOutcome}>
                            <View style={style.subbox1}>
                                <Text style={style.text1}>Income</Text>
                                <Text style={style.text2}>${inc_out.income ? inc_out.income : '0'}</Text>
                            </View>
                            <View style={style.subbox1}>
                                <Text style={style.text1}>Outcome</Text>
                                <Text style={style.text2}>${inc_out.outcome ? inc_out.outcome : '0'}</Text>
                            </View>
                        </View>
                        <View style={style.filter}>
                            <TouchableOpacity style={style.link} onPress={() => dispatch(incomeOutcome(user.data.id, 1))}><Text style={style.textFilter}>1 Day</Text></TouchableOpacity>
                            <TouchableOpacity style={style.link} onPress={() => dispatch(incomeOutcome(user.data.id, 7))}><Text style={style.textFilter}>7 Days</Text></TouchableOpacity>
                            <TouchableOpacity style={style.link} onPress={() => dispatch(incomeOutcome(user.data.id, 30))}><Text style={style.textFilter}>30 Days</Text></TouchableOpacity>
                            <TouchableOpacity style={style.link} onPress={() => dispatch(incomeOutcome(user.data.id, 180))}><Text style={style.textFilter}>6 Months</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={style.contButtons}>
                    <View style={style.contLink}>
                        <TouchableOpacity style={style.button1} onPress={() => props.navigation.navigate('TransactionsView')}>
                            <FontAwesome
                                style={style.icon}
                                name="send"
                                color="#BB59FA"
                                size={50}
                            />
                        </TouchableOpacity>
                        <Text style={style.textButton}>Transactions</Text>
                    </View>
                    <View style={style.contLink}>
                        <TouchableOpacity style={style.button1} onPress={() => props.navigation.navigate('stadistics')}>
                            <MaterialIcons
                                style={style.icon}
                                name="insert-chart"
                                color="#BB59FA"
                                size={60}
                            />
                        </TouchableOpacity>
                        <Text style={style.textButton}>Statistics</Text>
                    </View>
                    <View style={style.contLink}>
                        <TouchableOpacity style={style.button1} onPress={() => props.navigation.navigate('MyProducts')}>
                            <MaterialCommunityIcons
                                style={style.icon}
                                name="google-controller"
                                color="#BB59FA"
                                size={75}
                            />
                        </TouchableOpacity>
                        <Text style={style.textButton}>Products</Text>
                    </View>
                </View>
                {/* <View style={style.box4}>
        <View>
            <TouchableOpacity style={style.button2}
                onPress={() => { props.navigation.navigate('RechargeMoney') }}>
                <Feather
                    name="arrow-down-circle"
                    color="#FFF"
                    size={20}
                />
                <Text style={{ fontSize: 12, color: '#FFF', marginHorizontal: '3%' }}>Recargar Dinero</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={style.button2}
                onPress={() => { props.navigation.navigate('EnviarDinero') }}
            >
                <Feather
                    name="arrow-up-circle"
                    color="#FFF"
                    size={20}
                />
                <Text style={{ fontSize: 12, color: '#FFF', marginHorizontal: '3%' }}>Enviar Dinero</Text>
            </TouchableOpacity>
        </View>
    </View> */}
            </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13124E'
    },
    banner: {
        flex: 2, //el componente crece de arriba hacia abajo con el espacio disponible
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    contImage: {
        width: 115,
        height: 115,
        borderRadius: 110,
        borderColor: '#BB59FA',
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    Image: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    contBalance: {
        height: '100%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '5%'
    },
    balance: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
    },
    contSummary: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryBox: {
        width: '90%',
        height: '70%',
        alignItems: 'center',
        borderColor: '#BB59FA',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10
    },
    contSummaryLogo: {
        width: 55,
        height: 50
    },
    summaryLogo: {
        width: '100%',
        height: '100%'
    },
    incomeOutcome: {
        flex: 1,
        flexDirection: 'row',
    },
    subbox1: {
        flex: 1,
        alignItems: 'center',
        //height: 90,
        justifyContent: 'center',
        marginHorizontal: '3%',
    },
    text1: {
        fontSize: 20,
        color: '#FFF',
        opacity: 0.4
    },
    text2: {
        fontSize: 25,
        color: '#FFF',
    },
    filter: {
        flexDirection: 'row',
    },
    link: {
        marginHorizontal: '3%',
    },
    textFilter: {
        color: '#FFF',
        opacity: 0.8
    },
    contButtons: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    contLink: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button1: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#BB59FA',
        borderRadius: 20,
    },
    icon: {
        //color: '#FFF',
        textAlign: 'center',
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        opacity: 0.8,
        marginVertical: '5%'
    },
    button2: {
        width: 130,
        height: 45,
        marginHorizontal: '10%',
        color: '#FFF',
        marginVertical: '5%',
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 20,
    },
    contenedor: {
        marginHorizontal: 10
    },
    ciudad: {
        width: 250,
        height: 300,
        marginRight: 10, //da un margen entre las imagenes
    },
    mejores: {
        width: '100%', //para que la imagen tome toda la pantalla el componente padre debera tener un fleDirection: 'row'
        height: 200,
        marginVertical: 5
    },
    listado: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'

    },
    listadoItems: {
        flexBasis: '49%'
    },
    box4: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
    },

})

export default ProfileUser;