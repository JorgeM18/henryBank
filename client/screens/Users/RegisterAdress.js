import React, {useState, useEffect} from 'react'
import { View, Text, AppRegistry, StyleSheet, TextInput, TouchableHighlight, Alert} from 'react-native'
import * as Location from 'expo-location'
import {colors} from '../../utils/colors'

export default function RegisterAdress() {
    const [state, setState] = useState({
        telefono: '',
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
    const handleSubmit = () => {
        if (state.telefono && state.calle && state.localidad && state.numero && state.provincia && state.pais) {
            checkAddress()
            Alert.alert(
                'Mis Datos',
                JSON.stringify(state)
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
              const response = await fetch(consultaDomicilio)
              const result = await response.json()
              console.log('result', result)
            
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
        <View style={styles.container}>
            <View>
                <Text style={styles.domicilio}>
                    Alta de Cliente
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Telefono'
                    name='telefono'
                    defaultValue={state.telefono}
                    onChangeText={(e) => handleChange('telefono', e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Calle'
                    name='calle'
                    defaultValue={state.calle}
                    onChangeText={(e) => handleChange('calle', e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Numero'
                    name='numero'
                    defaultValue={state.numero}
                    onChangeText={(e) => handleChange('numero', e)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Localidad'
                    name='localidad'
                    defaultValue={state.localidad}
                    onChangeText={(e) => handleChange('localidad', e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Provincia'
                    name='provincia'
                    defaultValue={state.provincia}
                    onChangeText={(e) => handleChange('provincia', e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Pais'
                    name='pais'
                    defaultValue={state.pais}
                    onChangeText={(e) => handleChange('pais', e)}
                />
                <TouchableHighlight style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.textButton}>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        color: colors.BACKGROUND_COLOR,
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    domicilio: {
        borderColor: colors.BACKGROUND_COLOR,
        backgroundColor: colors.BACKGROUND_COLOR,
        textAlign:'center',
        fontSize: 18,
        marginBottom: 10,
        padding: 10,
        color: '#FFF',
    },
    input: {
        height: 40,
        borderColor: colors.BACKGROUND_COLOR,
        color: colors.BACKGROUND_COLOR,
        borderWidth: 1,
        padding: 10,
        marginBottom: 20
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
    textButton: {
        textAlign: 'center',
        color: '#fff'
    }
})
