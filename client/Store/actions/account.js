import axios from 'axios'
import { URL } from '@env';


export const GET_BALANCE = 'GET_BALANCE'
export const GET_ACCOUNT='GET_ACCOUNT'
export const OUTCOME_MOVEMENT='OUTCOME_MOVEMENT'
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
            // console.log('ERROR',error)
        })
    }
}
export function getAccount(id){
    console.log('ACTION ID',id)
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/account?userId=${id}`)
        .then((resp)=>{
            console.log('ACTION account', resp)
            dispatch({
                type: GET_ACCOUNT,
                account:resp.data
            })
        })
        .catch(error=>{
            // console.log('ERROR',error)
        })
    }
}
const StadisticsStorage=(outcome)=>{
    AsyncStorage.setItem('stadistics', JSON.stringify(outcome), err => {
      if (err) console.log('ERROR en AsyncStorage', err);
  })
  
  }
export function outcomeMovements(id, days, props){
    
    return function(dispatch){
        console.log('action', id, days)
        return axios.get(`http://${URL}/api/account/estadisticaGastos?id=${id}&days=${days}`)
        .then((resp)=>{
            // console.log(resp.data.content.gastosFraccionados)
           if(resp.data.message==='success'){
            dispatch({
                type:OUTCOME_MOVEMENT,
                outcomeMov:resp.data.content.gastosFraccionados
            })
            StadisticsStorage(resp.data.content.gastosFraccionados)
           }
        })
        .catch(err=>{
           if(err){
               Alert.alert(
                'GO Bank',
                        'You have not outcome',
                        [{
                            text: 'OK',
                            onPress: ()=>{props.navigation.navigate("stadistics")}
                        }]
        
               )
           }
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


