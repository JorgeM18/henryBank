import axios from 'axios'
import {URL,accessToken} from '@env'

export const RECHARGE_PAYPAL= 'RECHARGE_PAYPA'
export const CONFIRM_RECHARGE = 'CONFIRM_RECHARGE'

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