import axios from 'axios'
import {URL,accessToken} from '@env'

export const RECHARGE_PAYPAL= 'RECHARGE_PAYPA'
export const CONFIRM_RECHARGE = 'CONFIRM_RECHARGE'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const GET_TRANSACTIONS_NUM = 'GET_TRANSACTIONS_NUM'

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

const transaction = [
    {
        numTransaction: 1,
        state: 'done',
        amount: 100,
        description: 'pago de xxx ',
        movement_type: 'received',
       },
      {
        numTransaction: 2,
          state: 'done',
          amount: 100,
          description: 'pago de xxx yyy zzz etc etcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          movement_type: 'sender',
       },
          {
            numTransaction: 3,
              state: 'done',
              amount: 100,
              description: 'pago de xxx yyy zzz etc etc',
              movement_type: 'received',
          },
          {
          numTransaction: 4,
          state: 'done',
          amount: 100,
          description: 'pago de xxx yyy zzz etc etc',
          movement_type: 'sender',
              },
              {
                numTransaction: 5,
                  state: 'done',
                  amount: 100,
                  description: 'pago de xxx yyy zzz etc etc',
                  movement_type: 'received',
              },
              {
              numTransaction: 6,
              state: 'done',
              amount: 100,
              description: 'pago alguna cosa 6',
              movement_type: 'sender',
              },
              {
                numTransaction: 7,
                state: 'done',
                amount: 100,
                description: 'pago de xxx yyy zzz etc etc',
                movement_type: 'received',
            },
            {
                numTransaction: 8,
            state: 'done',
            amount: 100,
            description: 'pago de xxx yyy zzz etc etc',
            movement_type: 'sender',
                },
                {
                    numTransaction: 9,
                    state: 'done',
                    amount: 100,
                    description: 'pago de xxx yyy zzz etc etc',
                    movement_type: 'received',
                },
                {
                    numTransaction: 10,
                state: 'done',
                amount: 100,
                description: 'pago de xxx yyy zzz etc etc',
                movement_type: 'sender',
                }
      ]

export function getTransactions(id){
    console.log('...entro', id)
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

export function getTransactionForNum(num){
    const findTranc = transaction.findIndex(e => e.nummTransaction === num)
    console.log('actions', num, '---', transaction[findTranc] )
    return (dispatch) => {
        return dispatch({
            type:GET_TRANSACTIONS_NUM,
            transaction: transaction[findTranc]
        })
    }
}