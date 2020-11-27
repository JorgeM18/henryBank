import React, { useState } from 'react';
import axios from 'axios'
import { URL } from '@env';
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_USER='ADD_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const POST_CONTACTS = 'POST_CONTACTS'

//ACTIONS CREATE: CREAR UN USUARIO 
export function createUser(user, props) {
  return function (dispatch) {
    console.log(URL)
    return axios.post(`http://${URL}/api/user/createUser`, user)
      .then((resp) => {
        if(resp.data){
          dispatch({
            type: ADD_USER,
            user: resp.data
          })
          Alert.alert(
            'GO Bank',
            'Plaese confirm your Email!',
            [{
                text: 'OK',
                onPress: ()=>{props.navigation.navigate("InsertPin")}
            }]

        )
        }
     
      })
      .catch((error) => {
        // console.warn(error)
        Alert.alert(
          'GO Bank',
          'Server Error!',
          [{
              text: 'OK',
              onPress: ()=>{props.navigation.navigate("Home")}
          }]

      )

      })

  }

}

const LoginStorage=(user)=>{
  AsyncStorage.setItem('token', JSON.stringify(user.token), err => {
    if (err) console.log('ERROR en AsyncStorage', err);
})
AsyncStorage.setItem('usuario', JSON.stringify(user), err => {
    if (err) console.log('ERROR en AsyncStorage', err);
})

}
export const loginUser=(user, props)=>async(dispatch)=>{
  try{
    const resp= await axios.post(`http://${URL}/api/user/login`, user);
   
    const loginData= await resp.data;
    // console.log('LOGIN', loginData)
    dispatch({
          type: LOGIN_SUCCESS,
           user: loginData 
         });
    LoginStorage(loginData)
    if(loginData.message==='success'){
      props.navigation.navigate('UserProfile')
    }

  }catch(error){

    dispatch({
      type: 'LOGIN_FAIL',
      user:error.resp.data
    })
    if(error){
      Alert.alert(
        'Error',
        'User or Password Invalid'
  
  )

    }
    
  }
}


export function logout(){
  return(dispatch)=>{
      dispatch({
        type: 'LOGOUT_SUCCESS'
      })
  }
  
}

//VELIDAR PIN
export function validarPin(pin, props) {
  return function (dispatch) {
    return axios.post(`http://${URL}/api/user/validateUserPin`, { 'pin': pin })
      .then(resp => {
        // console.warn(resp.data.message)
        console.log(resp)
        dispatch({
          type: 'VALID_PIN',
          pin: resp.data.pin
        })
        if (resp.data.message === 'success') {

          props.navigation.navigate("CompleteDataUser")
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert(
            'Error',
            'Invalid PIN',
            [{
              text: 'OK',
              onPress: () => { props.navigation.navigate("InsertPin") }
            }]
          )
        }
      })
  }

}

//COMPLETAR DATOS DEL USUARIO

export function updateUser(lastname, typeDoc, numberDoc, birthday, numberPhone, email, image, props) {
  const usuario = { lastname, typeDoc, numberDoc, birthday, numberPhone, email, image }

  return function (dispatch) {
    return axios.put(`http://${URL}/api/user/approveUser`, usuario)
      .then(resp => {
        // console.warn(resp)
        dispatch({
          type: 'EDIT_USER',
          user: resp.data
        })
        console.log('REPUESTA', resp)
        if (resp.data.message === 'success') {

          props.navigation.navigate("RegisterAdress")
        }
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Sorry!Insert your data again',
          [{
            text: 'OK',
            onPress: () => { props.navigation.navigate("CompleteDataUser") }
          }]
        )
      })
  }
}

export function addAddress(payload) {
  console.log(payload)
  return function (dispatch) {
    return axios.put(`http://${URL}/api/user/cuentaGo`, payload)
      .then(resp => {

        dispatch({
          type: 'GET_USER',
          user: resp.data
        })
      })
  }

}

export function getDataUser(id) {
 console.log('PARAMETROS ID:',id)
  return function (dispatch) {
    return axios.get(`http://${URL}/api/user/${id}`)
      .then(resp => {
        dispatch({
          type: 'GET_DATA_USER',
          user: resp.data
        })
      })
      .catch(error=>{
        console.log(error)
      })
  
  }

}


export function newData(payload) {
  console.log(payload, 'ENTRE E E EEEE E E E')
  return function (dispatch) {
    return axios.put(`http://${URL}/api/user/editUser`, payload)
      .then(resp => {
        dispatch({
          type: 'NEW_DATA',
          user: resp.data
        })
      })
  }
}

