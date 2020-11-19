import axios from 'axios'
import {URL} from '@env';
import {Alert} from 'react-native'

export const POST_CONTACTS = 'POST_CONTACTS'

//ACTIONS

export function postContacts(array){
    return function(dispatch){
        array.forEach(element => {
            return axios.post(`http://${URL}/api/user/addContact`, element)
        })
        .then((resp)=>{
            console.log('ENTRO EL ACTION CONTACTS')
            dispatch({
            type: POST_CONTACTS,
            contact:resp.data
                })
            })
            .catch((error)=>{
             console.warn(error)
    
            })
        }
}