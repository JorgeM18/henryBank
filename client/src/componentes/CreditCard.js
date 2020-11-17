import React, { useState } from "react";
import { StyleSheet, View, Switch, TouchableOpacity, Text, Alert } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {colors} from './../../utils/colors'


const CreditCard = () => {
  const [state, setState] = useState({ useLiteCreditCardInput: false })
  const [valor, setValor] = useState('')

  const _onChange = (formData) => {
    setValor(formData)
   }
 const _onFocus = (field) => console.log("focusing", field);
 const  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => setState({ useLiteCreditCardInput: true });
 const validarTarjeta = () => {
   if(valor.valid) {
    Alert.alert('Datos de la tarjeta', JSON.stringify(valor, null, " ") )
   } else {
    Alert.alert('Debe completar todos los campos requeridos')
   }
 }


    return (
      <View style={s.container}>
        <Switch
          style={s.switch}
          onValueChange={_setUseLiteCreditCardInput}
          value={state.useLiteCreditCardInput} />

        { state.useLiteCreditCardInput ?
          (
            <LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={_onFocus}
              onChange={_onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC


              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={_onFocus}
              onChange={_onChange} />
          )
        }
                  <TouchableOpacity style={s.button}
                        onPress={() => {
                            validarTarjeta()
                        }}
                        >
                        <Text style={{ color: '#FFF', fontSize: 20}}>
                            Finalizar
                        </Text>

                    </TouchableOpacity>
      </View>
    );
  }


  const s = StyleSheet.create({
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    container: {
      backgroundColor: "#F5F5F5",
      marginTop: 10,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
    button: {
      height: 50, 
      width: 150, 
      backgroundColor: colors.BACKGROUND_COLOR, 
      borderRadius: 30, 
      justifyContent: 'center', 
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: '10%',
      marginBottom: '10%'
    }
  });


  export default CreditCard