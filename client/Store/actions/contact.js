import axios from 'axios'
import {URL} from '@env';

export const POST_CONTACTS = 'POST_CONTACTS'
export const GET_CONTACTS = 'GET_CONTACTS'

//ACTIONS

export function postContacts(array){
    return function(dispatch){
        array.map(element => {
            return axios.post(`http://${URL}/api/user/addContact`, element)
        })
        .then((resp)=>{
            console.log('ENTRO EL ACTION POST_CONTACTS')
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
export function getContacts(userId){
    console.log('Se hizo el dispatch de getContacts')
    return function(dispatch){
        return axios.get(`http://${URL}/api/user/contacts/${userId}` )
        .then((resp) =>{
            console.log('ENTRO EN EL ACTION GET_CONTACTS')
            dispatch({
                type: GET_CONTACTS,
                contacts: resp.data.content
            })
        })
    }
    }
 
