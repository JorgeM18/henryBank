import axios from 'axios'
import { URL } from '@env';


export const GET_BALANCE = 'GET_BALANCE'


export function getBalance(id){
    return (dispatch)=>{
        return axios.get(`http://${URL}/api/account/mybalance`,
       {
        params:{
            id:id
        }
       })
        .then((resp)=>{
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


