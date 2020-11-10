import axios from 'axios'

export const ADD_USER='ADD_USER'

const localhost='192.168.0.8:3000'

//ACTIONS CREATE: CREAR UN USUARIO 
export function createUser(user){
    // console.log(user)
    return function(dispatch){
        return axios.post(`http://${localhost}/api/user/createUser`, user)
        .then((resp)=>{
            console.log(resp)
            dispatch({
                type: ADD_USER,
                user:resp.data
            })
        })
        .catch((error)=>{
            console.log(error)

        })

    }
  
}