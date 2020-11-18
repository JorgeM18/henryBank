import React from 'react';
import axios from 'axios'
import {URL} from '@env';
import {Alert, processColor} from 'react-native'

export const ADD_USER='ADD_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const POST_CONTACTS = 'POST_CONTACTS'

//ACTIONS CREATE: CREAR UN USUARIO 
export function createUser(user){
   
    return function(dispatch){
        console.log(URL)
        return axios.post(`http://${URL}/api/user/createUser`, user)
        .then((resp)=>{
            dispatch({
                type: ADD_USER,
                user:resp.data
            })
        })
        .catch((error)=>{
            // console.warn(error)

        })

    }
  
}

// login user
// aca me deberia llegar el usuario y la password
export const loginUser = (user) => (dispatch) => {
    const userEnv = {
      email: user.email,
      password: user.password,
    };
  
    return axios
      .post(`http://${URL}/api/user/login`, userEnv)
      .then((res) => {
        console.log('ENTRÉ AL ACTION')
        console.log(res.data)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        // console.log('respuesta x---', error)
        // dispatch(
          
        //   returnErrors(error.response.data, error.response.status, LOGIN_FAIL)
        // );
        dispatch({ type: LOGIN_FAIL });
      });
  };

  export const logout = () => {
    return dispatch({ type: 'LOGOUT_SUCCESS' })
  };

  //VELIDAR PIN
export function validarPin(pin, props){
    return function(dispatch){
        return axios.post(`http://${URL}/api/user/validateUserPin`, {'pin': pin } )
        .then(resp=>{
          // console.warn(resp.data.message)
          console.log(resp)
            dispatch({
                type: 'VALID_PIN',
                pin:resp.data.pin
            })
            if(resp.data.message==='success'){
              props.navigation.navigate("CompleteDataUser")
            }
        })
        .catch(error=>{
          if(error){
            Alert.alert(
              'Error', 
              'Invalid PIN',
              [{
                  text: 'OK', 
                  onPress:()=>{props.navigation.navigate("InsertPin")}
              }]
          )
          }
        })
    }

}

//COMPLETAR DATOS DEL USUARIO

export function updateUser(lastname, typeDoc, numberDoc, birthday, numberPhone, email, image, props){
  const usuario={lastname, typeDoc, numberDoc, birthday, numberPhone, email, image}
  // console.log('USUARIO RECIVIDO', usuario)

    return function(dispatch){
        return axios.put(`http://${URL}/api/user/approveUser`, usuario)
        .then(resp=>{
          // console.warn(resp)
            dispatch({
                type:'EDIT_USER',
                user:resp.data
            })
            console.log('REPUESTA',resp)
            if(resp.data.message==='success'){           

              props.navigation.navigate("RegisterAdress")
            }
        })
        .catch(error=>{
          console.log(error)
        })
    }
}

export function addAddress(payload){
  console.log(payload)
  return function(dispatch){
      return axios.put(`http://${URL}/api/user/cuentaGo`, payload )
      .then(resp=>{
        console.log('ENTRÉ AL ACTION')
        console.log(resp.data)
          dispatch({
              type: 'GET_USER',
              user:resp.data
          })
      })
  }

}