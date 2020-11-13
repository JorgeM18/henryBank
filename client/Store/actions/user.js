import axios from 'axios'

export const ADD_USER='ADD_USER'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const localhost='192.168.0.4:3000'

//ACTIONS CREATE: CREAR UN USUARIO 
export function createUser(user){
    // console.log(user)
    return function(dispatch){
      
        return axios.post(`http://${localhost}/api/user/createUser`, user)
        .then((resp)=>{
            dispatch({
                type: ADD_USER,
                user:resp.data
            })
        })
        .catch((error)=>{
            // console.warn(error)

        })

    }
  
}

// login user
// aca me deberia llegar el usuario y la password
export const loginUser = (user) => (dispatch) => {
    const userEnv = {
      email: user.email,
      password: user.password,
    };
  
    return axios
      .post(`http://${localhost}/api/user/login`, userEnv)
      .then((res) => {
        console.log('ENTRÉ AL ACTION')
        console.log(res.data)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        // console.log('respuesta x---', error)
        // dispatch(
          
        //   returnErrors(error.response.data, error.response.status, LOGIN_FAIL)
        // );
        dispatch({ type: LOGIN_FAIL });
      });
  };

  export const logout = () => {
    return dispatch({ type: 'LOGOUT_SUCCESS' })
  };

  //VELIDAR PIN
  export function validarPin(pin, props){
    return function(dispatch){
        return axios.post(`http://${localhost}/api/user/validateUserPin`, {'pin': pin } )
        .then(resp=>{
          console.warn(resp.data.message)
            dispatch({
                type: 'VALID_PIN',
                pin:resp.data.pin
            })
            if(resp.data.message==='success'){

              props.navigation.navigate("CompleteDataUser")
            }else console.warn('Pin Invalid!')
        })
    }

}

//COMPLETAR DATOS DEL USUARIO

export function updateUser(email,lastname,typeDoc,numberDoc,birthday, numberPhone){
  const usuario={email,lastname,typeDoc,numberDoc,birthday, numberPhone}
  console.log(usuario)
    return function(dispatch){
        return axios.put(`http://${localhost}/api/user/approveUser`, usuario)
        .then(resp=>{
          // console.warn(resp)
            dispatch({
                type:'EDIT_USER',
                user:resp.data
            })
        })
    }
}

export function addAddress(payload){
  console.log(payload)
  return function(dispatch){
      return axios.put(`http://${localhost}/api/user/cuentaGo`, payload )
      .then(resp=>{
        console.log('ENTRÉ AL ACTION')
        console.log(resp.data)
          dispatch({
              type: 'GET_USER',
              user:resp.data
          })
      })
  }

}