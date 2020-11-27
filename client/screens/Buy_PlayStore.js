import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert, Text, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getBalance } from '../Store/actions/account'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '@env' 


export default function Buy_PlayStore(props){
    const dispatch = useDispatch()

    const [user, setUser] = useState('')

    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            console.log(usuario)
            setUser((JSON.parse(usuario)))
            user === '' ? 'nadaaaaa' : console.log('user',user)
    
        } catch (error) {
            console.log(error)
    
    
        }
    
    }
    useEffect(() => {

        onLoad()
        // user === '' ? '' : props.getTransactions(user.data.id)
        // user && props.getTransactions(user.data.id)    
      },[])

   const createBuy=  (amount)=>{

   Alert.alert(
       'Confirmacion de Compra',
       '¿Estas seguro de realizar esta compra?',[  {
        text: 'Cancel',
        style: 'cancel'
       },
       {
        text: 'OK',
        onPress:() => crear(user.data.id, amount, 'play store')
       },
     
       ],
       {cancelable: false}
    ) 
}


    const crear = async (userid, amount, commerce) =>{
        try{
            const {data} = await Axios.post(`http://${URL}/api/transactions/purchase`, {userid, amount, commerce})
            dispatch(getBalance(user.data.id,))
            Alert.alert(
                'successful',
                `Your code is: ${data.content.numMov}`,[ 
                {
                 text: 'OK',
                 style:'confirm'
                },
              
                ],
                {cancelable: false}
             )
        }catch(error){
            Alert.alert(
                'Error',
                `account with no balance`,[ 
                {
                 text: 'OK',
                 style:'confirm'
                },
              
                ],
                {cancelable: false}
             )
        }
    } 
    return(
        <ScrollView>
            <View style={styles.MainContainer}>
                <Image source={require('./images/PlayStore_20.jpg')} style={styles.Imagen}/>
                <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5}  onPress={(e)=>createBuy(1620)}>
                <Image
                source={require('./images/Logo-PlayStore.png')}
                style={styles.ImageIconStyle}
                />

                <View style={styles.SeparatorLine}/>
                <Text style={styles.TextStyle}>PAY $1,620  (20USD)</Text>
                
                </TouchableOpacity>


                <Image source={require('./images/PlayStore_50.png')} style={styles.Imagen}/>
                <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5} onPress={(e)=>createBuy(4050)}>
                <Image
                source={require('./images/Logo-PlayStore.png')}
                style={styles.ImageIconStyle}
                />

                <View style={styles.SeparatorLine}/>
                <Text style={styles.TextStyle}>PAY $4,050  (50USD)</Text>
                </TouchableOpacity>

                <Image source={require('./images/PlayStore_100.png')} style={styles.Imagen}/>
                <TouchableOpacity style={styles.PlayStore_Style} activeOpacity={0.5} onPress={(e)=>createBuy(8101)}>
                <Image
                source={require('./images/Logo-PlayStore.png')}
                style={styles.ImageIconStyle}
                />

                <View style={styles.SeparatorLine}/>
                <Text style={styles.TextStyle}>PAY $8,101  (100USD)</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        backgroundColor: '#292768',

    },

    Imagen:{
    alignItems: 'center',
    width: 130,
    height: 200,
    marginBottom: 30,
    marginTop: 30,
    marginLeft:20,
    },

    PlayStore_Style:{
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
        backgroundColor: '#BB59FA',
        width: 1,
        height: 40
    }
})
