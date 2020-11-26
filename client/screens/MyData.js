import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import {getDataUser, newData} from '../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';



const deviceWindow = Dimensions.get('window')
function MyData (){
    const dispatch=useDispatch()
    
    const [edit, setEdit] = useState(false) // para el renderizado condicional
    const [us, setUs]=useState('')
    // AsyncStorage.getItem('usuario').then(resp=>console.log('usuario',resp.data)) 
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
            console.log(usuario, 'ACACAACAA')  
            setUs((JSON.parse(usuario)))
            
        
        } catch (error) {
            console.log(error)


        }

    }
    //REVISAR
    useEffect(() => {
        onLoad()
        us!==''? dispatch(getDataUser(us.data.id)):''
        //    onLoad()

    }, [])
   
   console.log('my data', us)
    const [state, setState] = useState({
        id:'',
        name:"",
        lastname: "",
        typeDocument:"",
        numberDocument:"",
        phone: "",
        adress :""
    })

    const newData = () => {
        setEdit(false);
        // dispatch(newData({
        //     phone: state.phone,
        //     address: state.adress
        // }))
    }
    
  
    return(
        <View style={styles.container}>
            <Image source ={us!==''?{uri:us.data.image}:require('../screens/images/favicon.png')} style={styles.logo}/>
            <View style={{ flexDirection:'row' }}>
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
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent}
                defaultValue='Lastname:'
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.lastname:''}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    lastname:text})} editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent}
                defaultValue={us!==''?us.data.documenttype.toUpperCase() + ':': ''}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.documentnum:''}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    numberDocument:text})} editable = {false}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={edit? styles.transparent2: styles.transparent}
                defaultValue={edit? 'New Phone:' : 'Phone'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
                <TextInput
                style={edit? styles.new: styles.inputGroup}
                defaultValue={us!==''? us.data.phone: ''}
                placeholder={us!==''? us.data.phone: ''}
                placeholderTextColor = "gray"
                onChangeText = {text => setState({...state,
                    phone:text})} editable = {edit}/>
            </View>
            {
                !edit &&
            <View style={{ flexDirection:'row' }}>
            <TextInput
                style={styles.transparent}
                defaultValue='Address:'
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    name:text})} editable = {false}/>
                <TextInput
                style={styles.inputGroup}
                defaultValue={us!==''? us.data.address + ' ' + us.data.addressnum + ', ' + us.data.city :''}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>
            </View>
            }
            {
                edit && (
                    <View style={styles.container}>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.transparent2}
                defaultValue='New Address'
                placeholder = 'New Address'
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {false}/>
                <TextInput
                style={styles.new3}
                defaultValue={us!==''? us.data.address: 'Street'}
                placeholder = {'Street'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>
                <TextInput
                style={styles.new3}
                defaultValue={us!==''? us.data.addressnum :'Num'}
                placeholder = {'Num'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>
            </View>
            <View style={{ flexDirection:'row' }}>
                <TextInput
                style={styles.new3}
                defaultValue={us!==''? us.data.city :'City'}
                placeholder = {'City'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>

                <TextInput
                style={styles.new3}
                defaultValue={us!==''? us.data.province :'Province'}
                placeholder = {'Province'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>
                    <TextInput
                style={styles.new3}
                defaultValue={us!==''? us.data.country :'Country'}
                placeholder = {'Country'}
                placeholderTextColor = "#3B8EA5"
                onChangeText = {text => setState({...state,
                    adress:text})} editable = {edit}/>
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
                <TouchableOpacity style={styles.btn0} onPress={() => setEdit(true)}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                       Edit My Data
                        </Text>
                </TouchableOpacity>
                }
                {/* <TouchableOpacity style={styles.editBtn} >
                    <Text style={styles.editTextBtn} >Edit My Data</Text> 
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <Text style={styles.needHelp}>Do you need help?</Text>
                </TouchableOpacity>
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
    logo:{
        width: 60,
        height: 80,
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
        marginTop: 5
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
        marginVertical: 20,
        marginHorizontal: 5,
        width: '30%'

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
        borderColor: '#dee2ff',
        borderWidth: 1,
        fontSize: 18,
        width: '30.8333%',
        padding: 10,
        color: 'black',
        backgroundColor: '#dee2ff',
        textAlign: "right",

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