import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    Alert,
    Dimensions,
    Icon
} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import firebase from '../../utils/Firebase.js'
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



const typeDocs = [

    { label: 'DNI', value: 'dni' },
    { label: 'Passport', value: 'passport' },
    { label: 'name', value: 'name' },

]
const CompleteDataUser = (props) => {


    const dispatch = useDispatch()
    const [lastname, setLastname] = useState('')
    const [typeDoc, setTypeDoc] = useState('')
    const [numberDoc, setNumberDoc] = useState('')
    const [birthday, setBirthday] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [image, setImage] = useState('')
   

    //    CONFIGURACION DE DATA-PICKER
    const [fecha, setFecha] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isMayor, setIsmayor] = useState(true)

    const showDatePicker = () => {

        setDatePickerVisibility(true)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        const opciones = { year: 'numeric', month: 'long', day: "2-digit" }

        var fechaNac = moment(date, 'YYYY-MM-DD');

        var years = moment().diff(fechaNac, 'years');

        if (years > 16) {
            setFecha(date.toLocaleDateString('es-ES', opciones))
            setBirthday(fechaNac)
            setIsmayor(true)
        
        } else {
            setIsmayor(false)
            setFecha(date.toLocaleDateString('es-ES', opciones))

        }
        hideDatePicker();

    };

    const placeholderTypeDoc = {
        label: 'Select a Type Document',
        value: null,
        // color: '#1e1e1e',
        color: '#1c100b',
    }
    //UPLOAD IMAGE
    const uploadImage = (uri) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response)
                }
            };
            xhr.open('GET', uri);
            xhr.responseType = 'blob';
            xhr.send();
        });
    };
  

    //CARGAR IMAGEN

    const openGallery = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (resultPermission) {
            let imageSelected = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (imageSelected.cancelled === false) {

                const imageUri = imageSelected.uri;
                uploadImage(imageUri)
                    .then(resolve => {
                      
                        const nameImg = (JSON.stringify(resolve._data.name))
                        const id = nameImg.replace(/\"/g, "")
                        const fecha = moment(new Date()).format("YYYY-MM-DD")
                       
                        let ref = firebase.storage().ref().child(`images/${id}&${fecha}`);
                        ref.put(resolve)
                            .then(resolve => {
                                
                                firebase.storage().ref(`images/${id}&${fecha}`).getDownloadURL()
                                    .then((response) => {
                                      
                                        setImage(response)
                                       

                                    })
                                    .catch(err => { })

                            })
                            .catch(error => {
                             
                            });
                    })
                    .catch(error => {
                       
                    });


            }


        }


    };

    const update = () => {
      
        AsyncStorage.getItem('email')
            .then(email => {
              
                dispatch(updateUser(lastname, typeDoc, numberDoc, birthday, numberPhone, email, image, props))
               
            })


    }


    return (
        <ScrollView style={style.container} >
            <LinearGradient
                colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >

                <View style={{ padding: 10, marginTop: 20, alignItems: 'center' }}><Title style={style.tittle}>Complete your Personal Data</Title></View>

                <View style={style.actionInput} >
                    <TextInput style={style.inputGroup}
                        placeholder=" Lastname"
                        autoCapitalize="none"
                        defaultValue={lastname}
                        onChangeText={value => setLastname(value) } 
                        />
                   
                </View>
                <View style={style.actionInput} >
                    <TouchableOpacity style={style.inputGroup} onPress={openGallery}><Text style={{ color: 'grey', fontSize: 17, fontFamily: 'serif' }}>Select an Image</Text></TouchableOpacity>

                </View>
                <View style={style.actionInput}>
                    <TextInput style={style.inputGroup} placeholder=" Phone Number"
                        keyboardType='numeric'
                        defaultValue={numberPhone}
                        onChangeText={value => setNumberPhone(value)} />
                  
                </View>
                <View style={style.actionInput}>
                    <View style={style.picker}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            placeholder={placeholderTypeDoc}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome
                                    name="caret-down"
                                    size={1.5}
                                    color={'black'}
                                    backgroundColor="transparent"
                                    underlayColor="transparent"
                                    style={pickerSelectStyles.icon}
                                />;
                            }}
                            onValueChange={value => { setTypeDoc(value)}}
                            items={typeDocs}
                        />

                    </View>
                </View>


                <View style={style.actionInput}>
                    <TextInput style={style.inputGroup} placeholder="Document Number"
                     keyboardType='numeric'
                        onChangeText={value => setNumberDoc(parseInt(value))} />
                    
                </View>
                <View style={style.actionInput}>

                    <TouchableOpacity style={{ ...style.inputGroup, height: 40 }} onPress={showDatePicker}>
                        <Text style={{ fontSize: 18, justifyContent: 'center', color: 'grey', fontFamily: 'serif' }}>Select a Birth Date</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
            
                  
                </View>
                <View style={{marginHorizontal:20}}>
                   {
                        isMayor ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={style.errorMsg}>You must be of legal age</Text>
                            </Animatable.View>
                    }

                   </View>
                <View style={{marginHorizontal:20}}>
                {
                        fecha !== '' ?
    
                        <Text style={{ fontSize: 18, marginTop: 10, alignItems: 'center', color: '#fff' }}> Date Selected: {fecha}</Text>
                                
          
                            : null
                    }
                </View>

                <View style={style.actionInput}>

                    <TouchableOpacity style={style.btn} onPress={()=>update()}>
                        <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                            Continue
            </Text>
                    </TouchableOpacity>

                </View>

            </LinearGradient>
        </ScrollView>

    )

}
export default CompleteDataUser;
//CREAR LOS ESTILOS
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2333',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    actionInput:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 5,

    },
    icon:{
        padding: 10,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tittle: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    text_gral: {

    },
    inputGroup: {
        marginVertical: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width: '80%',
        padding: 10,
        backgroundColor: '#EDF7F6',
        borderRadius: 8,
        fontFamily: 'serif' 
    },
    picker: {
        width: '80%',
        height: 45,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: '#EDF7F6',
        fontSize: 20,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 7,
        // color: '#05375a',
        marginTop: 10
    },
    dataPicker: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#F5FCFF'

    },
    bot: {
        backgroundColor: '#FFF'
    },
    button: {
        width: 280,
        height: 70,
        backgroundColor: '#1f2333',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    btn: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1f2333',
        marginVertical: 20,
        marginHorizontal: 40

    },
});

const pickerSelectStyles = {

    inputAndroid: {
        fontSize: 17,
        fontFamily: 'serif',
        color: 'black',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    placeholder: {
        color: 'grey',
        fontFamily: 'serif',
        fontSize: 17
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
};