import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Axios from 'axios'
import { URL } from '@env' 
export default function Buy_PlayStore(props){
    const [state, setState] = useState({
        amount:'',
        commerce:'',
        userid: usuario ? usuario.user.id : ''
    })
   const usuario= useSelector(store => store.user)
   
   const createAlert20=  ()=>{
    setState({ ...state, amount: 20, commerce: 'Play Store'})
   Alert.alert(
       'Confirmacion de Compra',
       '¿Estas seguro de realizar esta compra?',[  {
        text: 'Cancel',
        style: 'cancel'
       },
       {
        text: 'OK',
        onPress:() => crear()
       },
     
       ],
       {cancelable: false}
       
      
   )
}

const createAlert50=  ()=>{
    setState({ ...state, amount: 50, commerce: 'Play Store'})
   Alert.alert(
       'Confirmacion de Compra',
       '¿Estas seguro de realizar esta compra?',[  {
        text: 'Cancel',
        style: 'cancel'
       },
       {
        text: 'OK',
        onPress:() => crear()
       },
     
       ],
       {cancelable: false}
       
      
   )
}

const createAlert100=  ()=>{
    setState({ ...state, amount: 100, commerce: 'Play Store'})
   Alert.alert(
       'Confirmacion de Compra',
       '¿Estas seguro de realizar esta compra?',[  {
        text: 'Cancel',
        style: 'cancel'
       },
       {
        text: 'OK',
        onPress:() => crear()
       },
     
       ],
       {cancelable: false}
       
      
   )
}
    const crear = async () =>{
    try{
        await Axios.post(`http://${URL}/api/transactions/purchase`, state)
        props.navigation.navigate('TransactionsView')
    }catch(error){

    }
    } 
    return(
        <View style={styles.MainContainer}>
            <Image source={require('./images/PlayStore_20.jpg')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5}  onPress={createAlert20}>
            <Image
            source={require('./images/Logo-PlayStore.png')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>PAY $20</Text>
            
            </TouchableOpacity>


            <Image source={require('./images/PlayStore_50.png')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5} onPress={createAlert50}>
            <Image
            source={require('./images/Logo-PlayStore.png')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>PAY $50</Text>
            </TouchableOpacity>

            <Image source={require('./images/PlayStore_100.png')} style={styles.Imagen}/>
            <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5} onPress={createAlert100}>
            <Image
            source={require('./images/Logo-PlayStore.png')}
            style={styles.ImageIconStyle}
            />

            <View style={styles.SeparatorLine}/>
            <Text style={styles.TextStyle}>PAY $100</Text>
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
    width: 130,
    height: 200,
    marginBottom: 30,
    marginTop: 1
    },

    PlayStore_Style:{
        width: 260,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3bccff',
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
