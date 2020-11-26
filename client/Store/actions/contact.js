import axios from 'axios'
import {URL} from '@env';

export const POST_CONTACTS = 'POST_CONTACTS'
export const GET_CONTACTS = 'GET_CONTACTS'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const EDIT_CONTACT = 'EDIT_CONTACT'

//ACTIONS

export function postContacts(newContacts){
    console.log('ENTRO AL ACTION POSTCONTACTS')
    return function(dispatch){
        console.log('ENTRO AL RETURN FUNCTION DISPATCH')
        newContacts.forEach(element => {
            return axios.post(`http://${URL}/api/user/addContact/`, element)
        })
        .then((resp)=>{
            console.log('HIZO EL AXIOS.POST')
            dispatch({
            type: POST_CONTACTS,
            contacts: resp.data
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

export function addFavorite(){
    console.log('se hizo el dispatch de addFvorite')
    return function(dispatch){
        return axios.put(`http://${URL}/api/user/addContact`, element)
    }
}
 
