import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    StyleSheet, TextInput, View, Dimensions, Text, Image, TouchableOpacity, Modal, ScrollView,
    Alert, ActivityIndicator,FlatList, TouchableHighlight
} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import RNPickerSelect from 'react-native-picker-select';
import { getDataUser } from '../Store/actions/user'
import { rechargePaypal, getTransactions } from '../Store/actions/transactions'
import { getAccount } from '../Store/actions/account'
// import { URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { getBalance } from '../Store/actions/account'
import axios from 'axios'
import store from '../Store/store';
import { LoadingIndicator } from 'react-native-expo-fancy-alerts';
// import { selectIsLoading } from 'selectors';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const URL='192.168.1.5:3000'

const typeRecharge = [
    {label:'', value:'default'},
    { label: 'Credit Card', value: 'creditCard' },
    { label: 'Efectivo', value: 'QR' },
    { label: 'Paypal', value: 'paypal' },
    { label: 'Mercado Pago', value: 'mercado' }

]

const RechargeMoney = (props) => {
    const dispatch = useDispatch()
    const transactions = useSelector(store => store.transaction)
    const usuario = useSelector(store => store.user)
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
    const [idCuenta, setIdCuenta] = useState('')
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsvisible]=useState(false)
    const [cardList, setCardList]=useState('')
    const [cardSelected, setCardSelected]=useState({
        id:''
    })
    const [ischange, setIsChange]=useState(false)


    console.log('usurario', usuario.user.id)


    const LoadingIndicator = () => {
        setVisible(true)

    }


    const handlerClick = (value) => {
        // console.log('id', usuario.user)
        setQrvalue(value)
     
        if (monto && usuario) {
 
            axios.post(`http://${URL}/api/transactions/cash`, {

                id: usuario.user.id,
                amount: parseInt(monto),
                commerce: qrvalue
            })
                .then(resp => {
                    // console.log('entro', resp)
                    if (resp) {
                        // setMonto('')
                        // setCash(false) 
                        // setIsChange(false)                      
                         msjSuccess()                       
                    }
                })
                .catch(error => {
                    if (error) {
                        Alert.alert(
                            'Error', //titulo
                            'Network Error,Please Recharge again! ', //Mensaje
                            [{
                                text: 'OK', //Arreglo de botones
                                onPress: () => {
                                    onclose()
                                },

                            }],
                        )

                    }
                })
        }

    }
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            console.log('asing', usuario)
            setUser((JSON.parse(usuario)))

        } catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        onLoad()
        // user === '' ? '' : dispatch(getDataUser(usuario.user.id))
        usuario? IdCuenta(): ''
    
        //    onLoad()

    }, [usuario])


    const payselectRechargepal = (value) => {
        switch (value) {
            case 'creditCard':
                setCash(false)
                setConfirm(false)
                setPaypal(false)
                setMercado(false)
                setIsvisible(true);
                setIsChange(true)
                CardofList();
                return setCard(true);
            case 'QR':
                setIsChange(true)
                setPaypal(false)
                setCard(false)
                setConfirm(false)
                setMercado(false)
                return setCash(true);
            case 'paypal':
                setIsChange(true)
                setCard(false)
                setCash(false)
                setConfirm(false)
                setMercado(false)
                return setPaypal(true)
            case 'mercado':
                setIsChange(true)
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
    const changePlaceHolder=()=>{
        if(!ischange){
            return placeholderPicker
        }
    }
    const onclose=()=>{
        setMonto('');
        setCash(false);
        setIsChange(false);
        setMercado(false);
        setPaypal(false);
        setCard(false) 
        setConfirm(false)       
        usuario ? dispatch(getBalance(usuario.user.id)) : null;
        usuario ? dispatch(getTransactions(usuario.user.id)) : null;
        props.navigation.navigate('UserProfile');
       }

    const msjSuccess=()=>{
        Alert.alert(
            'Success', //titulo
            'Hurray! your money was added to your balance', //Mensaje
            [{
                text: 'OK', //Arreglo de botones
                onPress: () => {
                    onclose()
                    
                },

            }],
        )
    }
    const alertError=()=>{
        Alert.alert(
            'Error', //titulo
            'Network Error,Please Recharge again! ', //Mensaje
            [{
                text: 'OK', //Arreglo de botones
                onPress: () => { props.navigation.navigate('RechargeMoney')
                },

            }],

        )

    }

    //PARA OBTENER EL ID DE LA CUENTA
    function IdCuenta() {

        if (usuario.user.id) {
            console.log('entro')
            axios.get(`http://${URL}/api/account/?userId=${usuario.user.id}`)
                .then((resp) => {
                    // console.log('LO QUE SERIA LA CUENTA', resp.data.data.id)
                    setIdCuenta(resp.data.data.id)
                })
                .catch(error => {
                    console.log(error.response)
                })

        }

    }
    const abrir = () => {
        // IdCuenta();
        console.log(idCuenta)
        // user === '' ? '' : dispatch(getAccount(user.data.id))
        if (paypal) {

            dispatch(rechargePaypal(monto, idCuenta))
            const link = transactions.paypal.link
            console.log('NUMERO', link)
            if (link) {
                Linking.openURL(link).then(resp=>setConfirm(resp))
                .catch(err=>{
                  alertError()
                })
               
            }

        }
        if (mercado) {
            axios.post(`http://${URL}/api/transactions/mercadopago`, {
                amount: monto,
                id: usuario.user.id
            },
                { withCredentials: true },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            ).then((resp) => {
                const link = resp.data.content.link
                Linking.openURL(link).then(resp=>setConfirm(resp))
                .catch(err=>{
                alertError()
                })
            })
        }
        if(card){
            axios.post(`http://${URL}/api/transactions/creditCard`,{
                userId:  usuario.user.id,
                amount: monto,
                cardId: cardSelected.id
            }).then(resp=>{
                console.log(resp)
                if(resp.data.message==='success'){
                    // setCard(false);
                    // setMonto('')
                    // setIsChange(false)
                    msjSuccess()                   
                }
            }).catch(err=>{console.log(err)})
        }
    }

const confirmRecharge=()=>{
       if(numTransaction || mercado){
        //    setPaypal(false)
        //    setMonto('')
        //    setConfirm(false)
        //    setIsChange(false)
           msjSuccess();
        //    usuario ? dispatch(getBalance(usuario.user.id)) : null;
        //    props.navigation.navigate('UserProfile')

       }
    //    if(mercado){
    //     //    setMercado(false)
    //     //    setMonto('')
    //     //    setConfirm(false)
    //     //    setIsChange(false)
    //        msjSuccess();
    //     //    usuario ? dispatch(getBalance(usuario.user.id)) : null;
    //     // props.navigation.navigate('UserProfile')
    //    }
    
   }
   const CardofList=()=>{
    //    console.log('ejecuta')
    axios.get(`http://${URL}/api/user/${usuario.user.id}/getCards`)
      .then((resp) =>{
        //   console.log('CARDS',resp.data.content)
      setCardList(resp.data.content)})
  }


    return (
        <ScrollView style={style.container}>
            <View >
                <View>
                    <View style={{ alingItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, marginHorizontal: 20, paddingTop: 30, color: '#fff', fontFamily:'serif' }}>Insert Amount: </Text>
                    </View>
                    <View style={style.viewInput}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 35, marginTop: 30, color: '#fff',fontFamily:'serif' }}>$</Text>
                            <TextInput style={style.textInput}
                                keyboardType='numeric'
                                defaultValue={monto}
                                // autoFocus
                                onChangeText={value => setMonto(value)}
                            />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: '4%' }}>
                        <View style={style.picker}>
                            <RNPickerSelect
                                style={pickerSelectStyles}
                                placeholder={changePlaceHolder()}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={value => payselectRechargepal(value)}
                                items={typeRecharge}
                                Icon={() => {
                                    return <FontAwesome
                                        name="caret-down"
                                        size={1.5}
                                        backgroundColor="transparent"
                                        underlayColor="transparent"
                                        style={pickerSelectStyles.icon}
                                    />;
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={style.box}>
                    <View >
                        {
                            !cash ? (
                                <TouchableOpacity style={style.button}
                                    onPress={() => abrir()} activeOpacity={0.7}>
                                    <Text style={{ fontSize: 17,fontFamily:'serif', color: '#FFF', marginHorizontal: '30%' }}>Recharge</Text>
                                </TouchableOpacity>

                            ) : null
                        }
                    </View>

                   <View>
                    {
                        confirm ? (
                            <TouchableOpacity style={style.button}
                                onPress={() => confirmRecharge(numTransaction)} activeOpacity={0.7}>
                                <Text style={{ fontSize: 15, color: '#FFF',fontFamily:'serif', marginHorizontal: '5%' }}>Confirm Recharge</Text>
                            </TouchableOpacity>

                        ) : null
                    }
                </View>

                    <View style={{ backgroundColor: '#292768' }}>
                        <View style={{ backgroundColor: '#292768' }}>
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
                                                <Text style={{ fontSize: 17, color: '#FFF',fontFamily:'serif' }}>Generar</Text>
                                            </TouchableOpacity>
                                        </View></>
                                    ) : null
                            }
                        </View>
                    </View>

                </View>
                <View >
          <Modal
          
            animationType="slide"
            visible={isVisible}
            onRequestClose={() => {
              Alert.alert("Warning","no selected card",[
                {
                  text:'Cancel',
                  onPress:()=>setIsvisible(true)
                },
                {
                  text:'OK',
                  onPress:()=> {setIsvisible(false); setIsChange(false)}
                }
              ]);
              
            }}
          >
              <View style={{ flex: 1, backgroundColor:'#292768' }}>
                <View>
                  <Text style={style.modalText}>My Credit Card</Text>
                  
                  <FlatList
                    data={cardList}
                    inverted
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      return (
                        <TouchableHighlight
                          onPress={() => {
                             setCardSelected(item)
                            setIsvisible(!isVisible);
                           
                          }}
                        >
                          <View style={style.panelItemContainer} >
                            <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, fontFamily:'serif', color:'#fff', paddingLeft:10 }} >{item.bank}</Text>
                        <Text style={{  fontSize: 17, fontFamily:'serif', color:'#fff', paddingLeft:30, marginTop:5}}>{item.cardNumber}</Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )
                    }} 
                    />
                </View>
              </View>
          </Modal>
        </View>
                
            </View>
        </ScrollView>


    )

}
export default RechargeMoney;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292768'
    },
    box: {
        flex: 1,
        backgroundColor: '#292768',
        alignItems: 'center'

    },
    textInput: {
        flexDirection: 'row',
        height: 50,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 35,
        // margin: 10,
        fontSize: 40,
        fontWeight: 'bold',
        width: 150,
        backgroundColor: '#292768',
        alignItems: 'center',
        color: '#fff',
        borderBottomWidth: 3,
        borderColor: '#BB59FA',

    },
    viewInput: {
        height: 100,
        alignItems: 'center',
        marginHorizontal: '10%',
    },
    button: {
        width: 190,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#bb59fa',
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 12,
        },

    },
    icon: {
        padding: 10,
    },
    picker: {
        width: '95%',
        height: 45,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: '#EDF7F6',
        fontSize: 20,
    },
    containerModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    contentModal: {
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 64,
        paddingVertical: 32,
        borderRadius: 16,
    },
    modalText: {
        marginTop:30,
        marginBottom: 15,
        textAlign: "center",
        fontSize: 17,
        fontWeight:'bold',
        color:'#fff',
        fontFamily:'serif',
        letterSpacing:2
      },
      panelItemContainer: {
        borderWidth: 0.7,
        borderColor: '#BB59FA',
        padding: 16,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:20,
        marginBottom: 20,
        marginHorizontal: '3%'
        
      },


});
const pickerSelectStyles = {
    inputAndroid: {
        fontSize: 17,
        fontFamily: 'serif',
        color: 'black',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    placeholder: {
        color: 'black',
        fontFamily: 'serif',
        fontSize: 17
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
};

