import React from 'react';
import axios from 'axios'
import {URL} from '@env';
import {Alert} from 'react-native'

export const ADD_CARD='ADD_CARD'
export const ALL_CARDS='ALL_CARDS'
export const DELETE_CARD = 'DELETE_CARD'
export const GET_ALL_CARDS = 'GET_ALL_CARDS'


export function vincularTarjeta(tarjeta, id, props){
    const newCard =  {
        number: tarjeta.values.number,
        name: tarjeta.values.name,
        expyry: tarjeta.values.expiry,
        type: tarjeta.values.type
    }
   
    return function(dispatch){
        return axios.post(`http://${URL}/api/user/addCard`,{
            userId:id,
            cardNumber:tarjeta.values.number,
            expyry:tarjeta.values.expiry,
            cvc:tarjeta.values.cvc,
            cardName:tarjeta.values.name,
            type:tarjeta.values.type
            
        } )
        .then((resp)=>{
            if(resp.data.message==='succes'){
                dispatch({
                    type: ADD_CARD,
                    card: newCard
                })
                // Alert.alert(
                //     'Success',
                //     'Credit Card add!',
                //     [{
                //         text: 'OK', //Arreglo de botones
                //         onPress: () => { props.navigation.navigate('ShowCreditCards')
                //         },
        
                //     }],

                // )
            }            
        })
        .catch(error=>{})
       

    }
  
}

const tarjetas = []

export function getCreditCards(id){
    return function(dispatch){
        return axios.get(`http://${URL}/api/user/${id}/getCards`)
        .then((resp)=>{
            console.log('ACTION',resp)
             dispatch({
                type: ALL_CARDS,
                cards: resp.data.content
            })

        })
       
    }
}

export function deleteCard(numCard) {
    return function(dispatch){
        console.log('delete', numCard)
        return dispatch({
            type: DELETE_CARD,
            card: numCard
        })
    }
}



export function getCreditCardsAll(){
   
    return function(dispatch){
        return dispatch({
            type: GET_ALL_CARDS,
        })
    }
}