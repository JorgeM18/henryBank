import axios from 'axios'
import { URL } from '@env';


export const GET_BALANCE = 'GET_BALANCE'
export const GET_ACCOUNT='GET_ACCOUNT'
export const RESET_ACCOUNT='RESET_ACCOUNT'


export function getBalance(id){
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/account/mybalance`,
       {
        params:{
            id:id
        }
       })
        .then((resp)=>{
            // console.log('respuesta', resp)
            dispatch({
                type:GET_BALANCE,
                balance:resp.data.content
            })
        })
        .catch(error=>{
            console.log('ERROR',error)
        })
    }
}
export function getAccount(id){
    console.log('ACTION ID',id)
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/account?id=${id}`)
        .then((resp)=>{
            console.log('ACTION', resp)
            dispatch({
                type: GET_ACCOUNT,
                account:resp.data.content
            })
        })
        .catch(error=>{
            console.log('ERROR',error)
        })
    }
}

export function ResetAccount(){
    return(dispatch)=>{
        dispatch({
            type: RESET_ACCOUNT
        })
    }
    
}


