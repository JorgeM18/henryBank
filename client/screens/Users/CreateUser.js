import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { createUser } from '../../Store/actions/user'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native'

const CreateUser = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const onChangeValue = (name, e) => {
        setState({
            ...state,
            [name]: e
        })
    }
    const dispatch = useDispatch()

    const createNewUser = async () => {
        if(validarCampos()){
            dispatch(createUser(state))

        }     

    }

    const validarCampos = () => {

        if (state.name.trim() === '' ||
            state.password.trim() === '' ||
            state.email.trim() === '') {
            mostrarAlerta();

        }
        if(state.email!== ''){
            validarEmail();
        }
       
        return true

    }
    //Alerta de Error
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //Mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )

    }
    //Validar Email
    const validarEmail = (email) => {
        var expression = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (expression.test(email)) setEmail(email)
        else {
            Alert.alert(
                'Error',
                'Email is Invalid',
                [{
                    text: 'OK'
                }]
            )
        }

    }


    return (
        <View style={style.container}>

                <View >
                    <TextInput 
                        style={style.inputGroup}
                        placeholder=" Name User"
                        name="name"
                        onChangeText={e => onChangeValue('name', e)} />
                </View>

                <View >
                    <TextInput style={style.inputGroup} 
                        placeholder=" Email User"
                        name="email"
                        onChangeText={e => onChangeValue('email', e)} />
                </View>

                <View >
                    <TextInput style={style.inputGroup} placeholder=" Password"
                        name="password"
                        secureTextEntry={true}
                        onChangeText={e => onChangeValue('password', e)} />
                </View>

                <View >

                    <TouchableOpacity style={style.btn} onPress={() => createNewUser()}>
                        <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '38%' }}>
                            Save User
                         </Text>
                    </TouchableOpacity>
                </View>
        
        </View>

    )

}
//CREAR LOS ESTILOS
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    view:{
        marginVertical:20,
    },
    inputGroup: {
        marginTop: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width:'90%'
    },
    btn: {
        width: 280,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        marginVertical:20,

    },
});
export default CreateUser;