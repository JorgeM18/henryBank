import React from 'react';
import axios from 'axios'
import {URL} from '@env';
import {Alert} from 'react-native'

export const ADD_CARD='ADD_CARD'
export const ALL_CARDS='ALL_CARDS'
export const DELETE_CARD = 'DELETE_CARD'
export const GET_ALL_CARDS = 'GET_ALL_CARDS'


export function vincularTarjeta(tarjeta){
   
    return function(dispatch){
        console.log('tarjeta', tarjeta)
        const newCard =  {
            number: tarjeta.values.number,
            name: tarjeta.values.name,
            expyry: tarjeta.values.expiry,
            type: tarjeta.values.type
        }
        
        return dispatch({
                    type: ADD_CARD,
                    card: newCard
                })
        // return axios.post(`http://${URL}/api/user/createUser`, user)
        // .then((resp)=>{
        //     dispatch({
        //         type: ADD_USER,
        //         user:resp.data
        //     })
        // })
        // .catch((error)=>{
        //     // console.warn(error)

        

    }
  
}

const tarjetas = []

export function getCreditCards(){
    console.log('----', tarjetas)
    return function(dispatch){
        return dispatch({
            type: ALL_CARDS,
            cards: tarjetas
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