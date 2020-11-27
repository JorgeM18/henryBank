import axios from 'axios'
import {URL} from '@env'

export const RECHARGE_PAYPAL= 'RECHARGE_PAYPA'
export const CONFIRM_RECHARGE = 'CONFIRM_RECHARGE'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const RECHARGE_MERCADO='RECHARGE_MERCADO'
export const INCOME_OUTCOME='INCOME_OUTCOME'
export const RESET_TRANSACTIONS='RESET_TRANSACTIONS'



export function incomeOutcome(id,numberDays){
    console.log('entro')
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/transactions/incomeOutcome?days=${numberDays}&id=${id}`,
        {withCredentials:true},
       { headers: {
              Accept: 'application/json'
        }}
        )
        .then(resp=>{
            console.log('INCOME_OUTCOME',resp.data.content)
            dispatch({
                type:INCOME_OUTCOME,
                data:resp.data.content
            })
        })

    }
}

export function rechargePaypal(amount, id){
    console.log('entro')
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/transactions/paypal?amount=${amount}&id=${id}`,
        {withCredentials:true},
       { headers: {
              Accept: 'application/json'
        }}
        )
        .then(resp=>{
            console.log('respuesta',resp.data)
            dispatch({
                type:RECHARGE_PAYPAL,
                payment:resp.data
            })
        })

    }
}
export function rechargeMercado(amount, id){
    console.log('entro')
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/transactions/mercadopago`,{
            amount,
            id
        },
        {withCredentials:true},
       { headers: {
              Accept: 'application/json'
        }}
        )
        .then(resp=>{
            console.log('respuesta',resp.data)
            dispatch({
                type:RECHARGE_MERCADO,
                payment:resp.data
            })
        })

    }
}
export function confirmRecharge(paymentId){
    console.log('entro')
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/transactions/paypal/confirm?paymentId=${paymentId}`,
        {withCredentials:true},
       { headers: {
              Accept: 'application/json'
        }}
        )
        .then(resp=>{
            console.log('respuesta',resp.data)
            dispatch({
                type:CONFIRM_RECHARGE,
                payment:resp.data
            })
        })

    }
}



export function getTransactions(id){
    
    return (dispatch) => {
        return axios.get(`http://${URL}/api/transactions/${id}`,
        {withCredentials:true},
       { headers: {
              Accept: 'application/json'
        }}
        )
        .then(resp=>{
            console.log('respuesta',resp.data.data.movements)
            const respuesta = resp.data.data.movements
            dispatch({
                type:GET_TRANSACTIONS,
                transaction: respuesta
            })
        })
        .catch(e => {console.log(e)
            return dispatch({
                type:GET_TRANSACTIONS,
                transaction: 'No transactions'
            })
        })
        
    }
}


export function ResetTransacctions(){
    return (dispatch)=>{
        dispatch({
            type: RESET_TRANSACTIONS
        }) 

    }
  
    
}