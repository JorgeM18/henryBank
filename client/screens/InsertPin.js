import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { validarPin } from '../Store/actions/user'
import { LinearGradient } from 'expo-linear-gradient';
import CodeInput from 'react-native-confirmation-code-input'


function InsertPin(props) {
    const [pin, setPin] = useState('');
    // const [aux, setAux]=useState(false)
    const dispatch = useDispatch()
    const verificarPin = useSelector(store => store.user.pin)
    //   console.warn(verificarPin)
    const validar = (isValid, code) => {
        
        dispatch(validarPin(parseInt(code), props))
        // setPin('')

    }


    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >

                <View style={styles.view}>
                    <Image source={require('./images/Logo-04.png')} style={styles.logo} />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text_header}>Insert  PIN</Text>
                    <View style={styles.text}>

                        <CodeInput
                            useRef="codeInputRef2"
                            keyboardType="numeric"
                            codeLength={6}
                            className='border-box'
                            compareWithCode='123456'
                            autoFocus={false}
                            codeInputStyle={{ fontWeight: '800' }}
                            onFulfill={(isValid,code) => validar(isValid,code)}
                            onCodeChange={Npin => setPin(parseInt(Npin))}
                        />


                    </View>
                    <TouchableOpacity style={styles.send_emailBtn} onPress={() => validar()}>
                        <Text style={styles.textButton}>Validate Pin</Text>
                    </TouchableOpacity>

                </View>

            </LinearGradient>
        </ScrollView>
    )

}

export default InsertPin;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f2333',

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 20,
        fontFamily: 'serif'
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 200,
        marginBottom: 40,

    },

    text: {
        width: "85%",
        // backgroundColor: "#465881",
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText: {
        height: 50,
        color: "white",
        fontFamily: 'serif'
    },

    textButton: {
        color: "white",
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'serif',
        letterSpacing: 2
    },

    send_emailBtn: {
        width: "80%",
        height: 50,
        alignItems: 'center',
        backgroundColor: "#1f2333",
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
})


