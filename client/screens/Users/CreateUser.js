import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'



const CreateUser = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const onChangeValue = (name, e) => {
        setState({
            ...state,
            [name]: e
        })
    }

    const createNewUser = async () => {
        if(state.name === '') {alert('insert Name') }
        else{
         console.log(state)
        props.navigation.navigate('UserList')

        }
           

    }

    return (

        <ScrollView style={style.container}>
            <View style={style.inputGroup}>
                <TextInput placeholder="Name User"
                    name="name"
                    onChangeText={e => onChangeValue('name', e)} />
            </View>
            <br />
            <View style={style.inputGroup}>
                <TextInput placeholder="Email User"
                    name="email"
                    onChangeText={e => onChangeValue('email', e)} />
            </View>
            <br />
            <View style={style.inputGroup}>
                <TextInput placeholder="Phone Number"
                    name="phone"
                    onChangeText={e => onChangeValue('phone', e)} />
            </View>
            <br />
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