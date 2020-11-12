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
            console.warn(error)

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
    return dispatch({ type: LOGOUT_SUCCESS })
  };