import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import {getDataUser, newData} from '../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'
import { URL } from '@env';




const deviceWindow = Dimensions.get('window')
function MyData (){
    const dispatch=useDispatch()
    
    const [edit, setEdit] = useState(false); // para el renderizado condicional
    const [modified, setModified] = useState('');
    const [us, setUs]=useState({
        data: {       // este objeto lo pongo porque me tira un error al cargar sino. no deberia pasar pero bueno esto lo soluciona por el momento
            phone: '',
            address: '',
            addressnum: '',
            documenttype: 'f',
            documentnum: '',
            name: '',
            lastname: '',
            city: ''
        }
    });
    // AsyncStorage.getItem('usuario').then(resp=>console.log('usuario',resp.data)) 
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            setUs((JSON.parse(usuario)))
            usuario = JSON.parse(usuario)
            setState({
                ...state,
                email: usuario.data.email,
                phone: usuario.data.phone,
                address: usuario.data.address,
                addressnum: usuario.data.addressnum,
                city: usuario.data.city,
                province: usuario.data.province,
                country: usuario.data.country
            })
            
        
        } catch (error) {
            console.log(error)


        }

    }
    //REVISAR
    useEffect(() => {
        onLoad()
        // us!==''? dispatch(getDataUser(us.data.id)):''
        //    onLoad()

    }, [])
   

    const [state, setState] = useState({
        id:'',
        name:"",
        lastname: "",
        typeDocument:"",
        numberDocument:"",
        phone: "",
        address :"",
        addressnum: '',
        city: '',
        province: '',
        country: '',
        email: ''
        
    })

    const newData = () => {
        // dispatch(newData(state))
        axios.put(`http://${URL}/api/user/editUser`, state)
        .then(res=> {
            setModified(res.data.content[1][0])
        })
        setEdit(false);
    }
    
  
    return(
        <View style={styles.container}>
            {!edit && (
                <View style={styles.container2}>
            <Image source ={us!==''?{uri:us.data.image}:require('../screens/images/favicon.png')} style={styles.logo}/>
            <View style={{ flexDirection:'row', marginTop: 15 }}>
                <TextInput
                style={styles.transparent}
                defaultValue='Name:'
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.name:''}
                placeholderTextColor = "#3B8EA5"
                 editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent}
                defaultValue='Lastname:'
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.lastname:''}
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent}
                defaultValue={us!==''?us.data.documenttype.toUpperCase() + ':': ''}
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.documentnum:''}
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={edit? styles.transparent2: styles.transparent}
                defaultValue={edit? 'New Phone:' : 'Phone:'}
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
                <TextInput
                style={edit? styles.new: styles.inputGroup}
                defaultValue={!modified? us.data.phone: modified.phone}
                // defaultValue={us!==''? us.data.phone: ''}
                // defaultValue={!modified? us.data.phone: modified.phone}
                // placeholder={us!==''? us.data.phone: ''}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    phone:text})} editable = {edit}/>
            </View>
            <View style={{ flexDirection:'row' }}>
            <TextInput
                style={styles.transparent}
                defaultValue='Address:'
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={!modified? us.data.address + ' ' + us.data.addressnum + ', ' + us.data.city : modified.address + ' ' + modified.addressnum + ', ' + modified.city}
                placeholderTextColor = "#3B8EA5"
                editable = {edit}/>
            </View>
            </View>

        )}
            
                
        
            {
                edit && (
        <View style={styles.container}>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={edit? styles.transparent2: styles.transparent}
                defaultValue={edit? 'New Phone:' : 'Phone:'}
                placeholderTextColor = "#3B8EA5"
                editable = {false}/>
                <TextInput
                style={edit? styles.new: styles.inputGroup}
                // defaultValue={!modified? us.data.phone: modified.phone}
                placeholder='New phone number'
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    phone:text})} editable = {edit}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent2}
                defaultValue='New Address'
                placeholder = 'New Address'
                placeholderTextColor = "gray"
                editable = {false}/>
                <TextInput
                style={styles.new3}
                // defaultValue={us!==''? us.data.address: 'Street'}
                placeholder = {'Street'}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    address:text})} editable = {edit}/>
                <TextInput
                style={styles.new3}
                // defaultValue={us!==''? us.data.addressnum :'Num'}
                placeholder = {'Num'}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    addressnum:text})} editable = {edit}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.new3}
                // defaultValue={us!==''? us.data.city :'City'}
                placeholder = {'City'}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    city:text})} editable = {edit}/>

                <TextInput
                style={styles.new3}
                // defaultValue={us!==''? us.data.province :'Province'}
                placeholder = {'Province'}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    province:text})} editable = {edit}/>
                    <TextInput
                style={styles.new3}
                // defaultValue={us!==''? us.data.country :'Country'}
                placeholder = {'Country'}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    country:text})} editable = {edit}/>
            </View>
            </View>
                )
            }
            {
                edit && (
                <View style={{flexDirection: 'row', alignItems: 'center', color: 'white'}}>
                {/* <Text style={styles.editTextBtn}>Edition mode</Text> */}
                <TouchableOpacity style={styles.btn} onPress={()=> setEdit(false)}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                       Cancel
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={newData}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                       Save
                        </Text>
                </TouchableOpacity>
                    </View>
                    )
            }
                {
                    !edit &&
                    <View style={styles.container2}>
                <TouchableOpacity style={styles.btn0} onPress={() => setEdit(true)}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                       Edit my data
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.needHelp}>Do you need help?</Text>
                </TouchableOpacity>
                </View>
                }
                
        </View>
    )
}
export default MyData;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#292768',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    container2:{
        // flex: 1,
        backgroundColor: '#292768',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    logo:{
        width: 80,
        height: 100,
        alignItems: 'flex-start'
    },

    inputViewSafe:{
        width: deviceWindow.width * 0.9 ,
        margin: 5,
        padding: 6,
        borderRadius:8,
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: "#eceff1"
    },
    editBtn:{
        width: "80%",
        backgroundColor: "#f19953",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10
   
    },

    editTextBtn:{
        flex: 0,
        color: "white",
        marginTop: 15,
        alignItems: "center",
        justifyContent: 'center' 

    },
    needHelp:{
        color: "white",
        height: 20,
        marginBottom: 10
    },
    btn0: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        marginVertical: 20,
        marginHorizontal: 40
    },
    btn: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        
        marginHorizontal: 5,
        width: '30%',
        marginBottom: 80

    },
    new: {
        marginVertical: 10,
        height: 40,
        // borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width: '61%',
        padding: 10,
        color: 'black',
        borderColor: '#dee2ff',
        textAlign: "right",
        backgroundColor: '#dee2ff',
        opacity: 0.7


    },
    new3: {
        marginVertical: 10,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 18,
        width: '30.8333%',
        padding: 10,
        color: 'black',
        backgroundColor: '#dee2ff',
        textAlign: "center",

        opacity: 0.7

    },
    inputGroup: {
        marginVertical: 10,
        height: 40,
        // borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width: '65%',
        padding: 10,
        color: '#cbc0d3',
        borderLeftColor: '#292768',
        borderTopColor: '#292768',

        textAlign: "right"

    },
    transparent: {
        marginVertical: 10,
        height: 40,
        // borderColor: '#292768',
        borderRightColor: '#292768',
        borderLeftColor: '#292768',
        borderTopColor: '#292768',
        borderWidth: 1,
        fontSize: 18,
        width: '27.5%',
        padding: 10,
        color: 'gray'
    },
    transparent2: {
        marginVertical: 10,
        height: 40,
        // borderColor: '#292768',
        borderRightColor: '#292768',
        borderLeftColor: '#292768',
        borderTopColor: '#292768',
        borderWidth: 1,
        fontSize: 18,
        width: '30.83333%',
        padding: 10,
        color: '#cbc0d3'
    }
})