import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import {getDataUser} from '../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';



const deviceWindow = Dimensions.get('window')
function MyData (){
    const dispatch=useDispatch()
 
    const [us, setUs]=useState('')
    // AsyncStorage.getItem('usuario').then(resp=>console.log('usuario',resp.data)) 
    const onLoad = async () => {
        try {
            var usuario = await AsyncStorage.getItem('usuario')
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
  
    return(
        <View style={styles.container}>
            <Image source ={us!==''?{uri:us.data.image}:require('../screens/images/favicon.png')} style={styles.logo}/>
                <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.name:''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                name:text})}/>
                  <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.lastname:''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                lastname:text})}/>
                 <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.documenttype:''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                typeDocument:text})}/>
                 <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.documentnum:''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                numberDocument:text})}/>
                 <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.phone: ''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                phone:text})}/>
                 <TextInput
            style={styles.inputViewSafe}
            defaultValue={us!==''?us.data.address +' '+ us.data.addressnum:''}
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => setState({...state,
                adress:text})}/>
                <TouchableOpacity style={styles.editBtn} >
                    <Text style={styles.editTextBtn} >Edit My Data</Text>
                </TouchableOpacity>
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
        backgroundColor: '#1e1e1e',
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
        color: "white",
        marginTop: 15 
    },
    needHelp:{
        color: "white",
        height: 20,
        marginTop: 5
    },
})