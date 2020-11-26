import React, {useState, useEffect} from 'react'
import { View, Text, AppRegistry, StyleSheet, TextInput, TouchableHighlight, Alert, Dimensions, ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location'
import {colors} from '../../utils/colors'
import { addAddress } from '../../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';


export default function RegisterAdress(props) {
    const [state, setState] = useState({
        calle: '',
        numero: '',
        localidad: '',
        provincia: '',
        pais: '',
    })
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (name, e) => {
        setState({
            ...state,
            [name]: e
        })
        
    }
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if ( state.calle && state.localidad && state.numero && state.provincia && state.pais) {
            checkAddress()
            
            AsyncStorage.getItem('email')
                .then(email => {
                    console.log(state)
                    const payload = {
                        ...state,
                        email: email
                    }
                    console.log('PAYLOAD')
                    console.log(payload);
                    dispatch(addAddress(payload))
                })
                Alert.alert(
                    'Info', 
                    'Debe Iniciar Sesion', 
                    [{
                        text: 'OK',
                        onPress: ()=>{ props.navigation.navigate('Login')} 
                    }]
                )
        } else {
            setErrorMessage('Debe ingresar todos los campos')
            Alert.alert('error',errorMessage)
        }
    }

    useEffect(() =>{
        load()
      }, [])

      async function checkAddress () {
          console.log('state', state)
          try {
              if (state.pais !== 'Argentina') return
                const consultaDomicilio = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${state.calle} nro ${state.numero}&localidad=${state.localidad}&provincia=${state.provincia}`
                console.log('direccion', consultaDomicilio)
              const response = await fetch(consultaDomicilio)
              const result = await response.json()
              const {parametros: {
                  direccion: {
                      altura: {valor},
                     calles: [calles],
                  },
                  localidad: localidad,
                  provincia: provincia
              } } = result
              setState({... state,
                calle: calles,
                numero: valor,
                localidad: localidad,
                provincia: provincia,
                pais: Argentina,
            })
          }
          catch (error) {
            setErrorMessage(error.message)
          }
      }
    
      async function load() {
        try {
          let { status } = await Location.requestPermissionsAsync()
    
          if (status !== 'granted') {
            setErrorMessage('Access to location is needed to run the app')
            return
          }
          const location = await Location.getCurrentPositionAsync()
    
          const { latitude, longitude } = location.coords
    
          const consultarUrl = `https://apis.datos.gob.ar/georef/api/ubicacion?lat=${latitude}&lon=${longitude}`
          
          const response = await fetch(consultarUrl)
    
          const result = await response.json()
          const {ubicacion} = result
          if (response.ok){
            console.log(ubicacion)
              if (ubicacion.municipio.nombre === null || ubicacion.provincia.nombre === null){
                setState({
                    ...state,
                    localidad: '',
                    provincia: '',
                    pais: ''
                })
              } else {
            setState({
                ...state,
                localidad: ubicacion.municipio.nombre,
                provincia: ubicacion.provincia.nombre,
                pais: 'Argentina'
            })}
          } else {
            setErrorMessage(result.message)
          }
    
        } catch (error) {
          setErrorMessage(error.message)
        }
      }

    return (
        <ScrollView style={styles.container}>
             <LinearGradient
                colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >
            <View>
                <Text style={styles.tittle}>
                    Address
                </Text>
                <View style={styles.actionInput}>
                        <TextInput 
                            style={styles.inputGroup}
                            placeholder='Calle'
                            name='calle'
                            defaultValue={state.calle}
                            onChangeText={(e) => handleChange('calle', e)}
                        />
                </View>
                <View style={styles.actionInput}>
                        <TextInput 
                            style={styles.inputGroup}
                            placeholder='Numero'
                            name='numero'
                            defaultValue={state.numero}
                            onChangeText={(e) => handleChange('numero', e)}
                        />
                </View>
                <View style={styles.actionInput}>
                        <TextInput
                            style={styles.inputGroup}
                            placeholder='Localidad'
                            name='localidad'
                            defaultValue={state.localidad}
                            onChangeText={(e) => handleChange('localidad', e)}
                        />
                </View>
                <View style={styles.actionInput}>
                        <TextInput 
                            style={styles.inputGroup}
                            placeholder='Provincia'
                            name='provincia'
                            defaultValue={state.provincia}
                            onChangeText={(e) => handleChange('provincia', e)}
                        />
                </View>
                <View style={styles.actionInput}>
                        <TextInput 
                            style={styles.inputGroup}
                            placeholder='Pais'
                            name='pais'
                            defaultValue={state.pais}
                            onChangeText={(e) => handleChange('pais', e)}
                        />
                </View>
                
                <TouchableHighlight style={styles.btn}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.textButton}>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e'
    },
    button: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: colors.BACKGROUND_COLOR,
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 20,
        width: '50%',
        borderRadius: 5,
    },
    btn: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1f2333',
        marginVertical: 20,
        marginHorizontal: 40,
        alignSelf:'center'

    },
    textButton: {
        fontSize: 16, 
        color: '#FFF', 
        marginHorizontal: '30%', 
        textAlign: 'center',
        letterSpacing:2
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
    actionInput:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 5,

    },
    tittle: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        padding: 10,
         marginTop: 20

    },

})