import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Switch, TouchableOpacity, Text, Alert } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { colors } from './../../utils/colors'
import { URL } from '@env'
import { connect } from "react-redux";
import { getCreditCardsAll, vincularTarjeta } from './../../Store/actions/cards'
import { getCreditCards } from '../../Store/actions/cards'
import { Value } from "react-native-reanimated";


const CreditCard = ({ navigation }) => {
  const usuario = useSelector(store => store.user)
  const dispatch = useDispatch()
  const [state, setState] = useState({ useLiteCreditCardInput: false })
  const [valor, setValor] = useState('')

  const _onChange = (formData) => {
    setValor(formData)
  }
  const _onFocus = (field) => console.log("focusing", field);
  const _setUseLiteCreditCardInput = (useLiteCreditCardInput) => setState({ useLiteCreditCardInput: true });
  const alert = () => {

    
    Alert.alert(
      'Success', //titulo
      'Your card was add!', //Mensaje
      [{
        text: 'OK', //Arreglo de botones
        onPress: () => {
          dispatch(getCreditCards(usuario.user.id))
          navigation.navigate('ShowCreditCards')

        },

      }
      ],
    )

  }
  const validarTarjeta = () => {
    if (valor.valid && usuario.user.id) {
      dispatch(vincularTarjeta(valor, usuario.user.id))
      // this.refs.CCInput.setValues({ number: "" })
      alert();


    } else {
      Alert.alert('Must complete all fields',
      [{
        text:'ok',
        onPress: () => {
          {navigation.navigate('CreditCard')}
         
        },
       
      }])
    }
  }

  return (
    <View style={s.container}>
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        {/* <Switch
          style={s.switch}
          onValueChange={_setUseLiteCreditCardInput}
          value={state.useLiteCreditCardInput} /> */}

        {state.useLiteCreditCardInput ?
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
              cardImageFront={require('./../../screens/images/card-front3.png')}
              cardImageBack={require('./../../screens/images/card-back.png')}
              additionalInputsProps={{CVC:{value:''}}}
              


              labelStyle={s.label}
              inputStyle={s.input}
              validColor={'#f6f2fc'}
              invalidColor={"red"}
              placeholderColor={'darkgrey'}
              onFocus={_onFocus}
              onChange={_onChange} />
          )
        }
      </View>
      <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 40 }}>
        <TouchableOpacity style={s.button}
          onPress={() => {
            validarTarjeta()
          }}
        >
          <Text style={{ color: '#f6f2fc', fontSize: 16, fontFamily: 'serif', alignSelf: 'center' }}>
            Add a card
                        </Text>

        </TouchableOpacity>
      </View>
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
    backgroundColor: "#292768",
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
    // marginBottom: 10,
  },
  label: {
    color: "#f6f2fc",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "#f6f2fc",
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#BB59FA',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#BB59FA',
    // marginVertical: 20,
    // marginHorizontal: 40

  },
});


// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     vincularTarjeta: (tarjeta) => dispatch(vincularTarjeta(tarjeta)),
//   };
// };

export default CreditCard;