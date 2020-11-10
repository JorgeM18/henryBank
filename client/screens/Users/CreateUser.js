import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {createUser} from '../../Redux/actions/user'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'




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
    const dispatch=useDispatch()

    const createNewUser =async  () => {
    
        dispatch(createUser(state))

    }

    return (

        <ScrollView style={style.container}>
            <View style={style.inputGroup}>
                <TextInput placeholder="Name User"
                    name="name"
                    onChangeText={e => onChangeValue('name', e)} />
            </View>
   
            <View style={style.inputGroup}>
                <TextInput placeholder="Email User"
                    name="email"
                    onChangeText={e => onChangeValue('email', e)} />
            </View>
          
            <View style={style.inputGroup}>
                <TextInput placeholder="Password"
                    name="password"
                    onChangeText={e => onChangeValue('password', e)} />
            </View>
         
            <View >

                <Button style={style.btn} title="Save User" onPress={() => createNewUser()} />
            </View>
        </ScrollView>

    )

}
//CREAR LOS ESTILOS
const style= StyleSheet.create({
    container:{
        flex:1,
        padding:35,
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderColor:"#cccccc",
    },
    btn:{
        marginBottom:7,
    },
});
export default CreateUser;