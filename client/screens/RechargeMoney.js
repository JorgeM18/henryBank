import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TextInput, View, Dimensions, Text, Image, TouchableOpacity, Modal, WebView, Pressable, ScrollView, Alert } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import RNPickerSelect from 'react-native-picker-select';
import { getDataUser } from '../Store/actions/user'
import { rechargePaypal, confirmRecharge } from '../Store/actions/transactions'
import { URL, accessToken } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import axios from 'axios'


const typeRecharge = [
    { label: 'Credit Card', value: 'creditCard' },
    { label: 'Efectivo', value: 'QR' },
    { label: 'Paypal', value: 'paypal' },
    { label: 'Mercado Pago', value: 'mercado' }

]

const RechargeMoney = (props) => {
    const dispatch = useDispatch()
    const transactions = useSelector(store => store.transaction)
    // const usuario = useSelector(store => store.user)
    const numTransaction = transactions.paypal.numTransaction
    const [card, setCard] = useState(false)
    const [cash, setCash] = useState(false)
    const [paypal, setPaypal] = useState(false)
    const [mercado, setMercado] = useState(false)
    const [visible, setVisible] = useState(false)
    const [monto, setMonto] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    const [user, setUser] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [idCuenta, setIdCuenta]=useState('')
    const userLogged = useSelector(store => store.user.user)
    // console.log(monto)
    // useEffect(()=>{
    //     dispatch(getDataUser())
    // })
    //PARA OBTENER EL ID DE LA CUENTA
   function IdCuenta(){
     
    if(user.data.id){
        console.log('entro')
        axios.get(`http://${URL}/api/account/?userId=${user.data.id}`)
        .then((resp)=>{
            // console.log('LO QUE SERIA LA CUENTA', resp.data.data.id)
            setIdCuenta(resp.data.data.id)
        })
        .catch(error=>{
            console.log(error.response)
        })
    
    }
   
   }
    const handlerClick = (value) => {
        console.log('Monto', value)
        setQrvalue(value)
        if (monto) {
            axios.post(`http://${URL}/api/transactions/cash`, {

                id: user.data.id,
                amount: parseInt(monto),
                qrvalue
            })
                .then(resp => {
                    console.log('saldo', resp)
                    if (resp) {
                        Alert.alert(
                            'Success', //titulo
                            'Hurray! your money was added to your balance', //Mensaje
                            [{
                                text: 'OK', //Arreglo de botones
                                onPress: () => { props.navigation.navigate('UserProfile') },

                            }],
                        )
                    }
                })
        }

    }
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            setUser((JSON.parse(usuario)))

        } catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        onLoad()
        user === '' ? '' : dispatch(getDataUser(user.data.id))
        //    onLoad()

    }, [])


    const payselectRechargepal = (value) => {
        switch (value) {
            case 'creditCard':
                setCash(false)
                setConfirm(false)
                setPaypal(false)
                setMercado(false)
                return setCard(true);
            case 'QR':
                setPaypal(false)
                setCard(false)
                setConfirm(false)
                setMercado(false)
                return setCash(true);
            case 'paypal':
                setCard(false)
                setCash(false)
                setConfirm(false)
                setMercado(false)
                return setPaypal(true)
            case 'mercado':
                setCard(false)
                setCash(false)
                setConfirm(false)
                setPaypal(false)
                return setMercado(true)

            default:
                return value;

        }

    }
    //CONFIG DE SELECT PICKER
    const placeholderPicker = {
        label: 'Select a Type Pay',
        value: null,
        color: '#1e1e1e',

    }
    const [Press, setPress] = useState({
        selected: null
    })

    const abrir = () => {
        IdCuenta();
        if (paypal) {

            dispatch(rechargePaypal(monto, idCuenta))
            const link = transactions.paypal.link
            console.log('NUMERO', link)
            if (link) {
                Linking.openURL(link)
                link ? setConfirm(true) : setConfirm(false)
            }

        }
    }

    const confirmPaylpal = (id) => {
        axios.get(`http://${URL}/api/transactions/paypal/confirm?paymentId=${id}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(resp => {
                console.log('confirm recharge', resp.data)
            })
            .catch(err => {
                // console.log('HEADERS',err.response.headers)
                if (err) {
                    Alert.alert(
                        'Error',
                        'Invalid Recharge!',
                        [{
                            text: 'OK',
                            onPress: () => { setPaypal(false), setMonto(''), setConfirm(false) }
                        }]
                    )
                }
            })

    }


    return (
        <ScrollView>
            <View style={style.container}>
                <View style={{ alingItems: 'center' }}>
                    <Text style={{ fontSize: 20, marginHorizontal: 20, paddingTop: 30 }}>Insert Amount: </Text>
                </View>
                <View style={{ height: 100, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, marginTop: 30 }}>$</Text>
                        <TextInput style={style.textInput}
                            keyboardType='numeric'
                            defaultValue={monto}
                            autoFocus
                            onChangeText={value => setMonto(value)}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={placeholderPicker}
                        defaultValue={placeholderPicker}
                        onValueChange={value => payselectRechargepal(value)}
                        items={typeRecharge}
                    />
                    {
                        !cash ? (
                            <TouchableOpacity style={style.button}
                                onPress={() => abrir()} activeOpacity={0.7}>
                                <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '35%' }}>Recharge</Text>
                            </TouchableOpacity>

                        ) : null
                    }
                </View>
                {/* <View>
                    {
                        confirm ? (
                            <TouchableOpacity style={style.button}
                                onPress={() => confirmPaylpal(numTransaction)} activeOpacity={0.7}>
                                <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '35%' }}>Confirm Recharge</Text>
                            </TouchableOpacity>

                        ) : null
                    }
                </View> */}

                <View>
                    <View>
                        {
                            cash ?
                                (<>
                                    {/* <View>
                            <TouchableOpacity onPress={() => { setCash(false) }}><Text style={{ fontSize: 20 }}>X</Text></TouchableOpacity>
                        </View> */}
                                    <View style={{ alignItems: 'center' }}>

                                        <QRCode
                                            outerEyeStyle='square'
                                            value={qrvalue ? `Gobank/transactions/recharge/${user.data.id}?amount=${monto}` : 'NA'}
                                            size={250}
                                            bgColor='#000'
                                            fgColor='#fff'
                                        // linearGradient={['rgb(255,0,0)', 'rgb(0,255,255)']}
                                        />
                                        <TouchableOpacity style={style.button}
                                            onPress={() => handlerClick(monto)} activeOpacity={0.7}>
                                            <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '35%' }}>Generar</Text>
                                        </TouchableOpacity>
                                    </View></>
                                ) : null
                        }
                    </View>
                </View>

            </View>
        </ScrollView>


    )

}
export default RechargeMoney;

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1e1e1e'
    },
    textInput: {
        flexDirection: 'row',
        height: 40,
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold'

    },
    button: {
        width: 170,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        marginHorizontal: '2%',
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 12,
        },

    }


});
const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {

        borderColor: 'black',
        borderWidth: 1,
        color: 'black',
        marginHorizontal: '5%',
        marginVertical: 10

    },
});


