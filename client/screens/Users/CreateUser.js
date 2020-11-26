import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import { useDispatch } from 'react-redux'
import { createUser } from '../../Store/actions/user'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const CreateUser = (props) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        checktextInput: false,
        checkemailInput: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidPassword: true,
    });
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })


    const { colors } = useTheme();
    const dispatch = useDispatch()

    const handlerTextChange = (value) => {
        if (value.length >= 4) {
            setNewUser({
                ...newUser,
                name: value,
                checktextInput: true,
                isValidUser: true
            });
            setState({
                ...state,
                name:value
            })
        } else {
            setNewUser({
                ...newUser,
                name: value,
                checktextInput: false,
                isValidUser: false

            });
        }
    }

    const handlerEmailChange = (value) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(value) === true) {
            setNewUser({
                ...newUser,
                email: value,
                checkemailInput: true,
                isValidEmail: true
            });
            setState({
                ...state,
                email:value
            })
        } else {
            setNewUser({
                ...newUser,
                email: value,
                checkemailInput: false,
                isValidEmail: false

            });
          
        }
    }
    const handlePassChange = (pass) => {
        if (pass.trim().length >= 6) {
            setNewUser({
                ...newUser,
                password: pass,
                isValidPassword: true
            })
            setState({
                ...state,
                password:pass
            });
        } else {
            setNewUser({
                ...newUser,
                password: pass,
                isValidPassword: false
            });
         
        }

    }
    const updatesecureTextEntry = () => {
        setNewUser({
            ...newUser,
            secureTextEntry: !newUser.secureTextEntry
        });
    }
    const handlerValidUser = (value) => {
        if (value.trim().length >= 4) {
            setNewUser({
                ...newUser,
                isValidUser: true
            });

        } else {
            setNewUser({
                ...newUser,
                isValidUser: false
            });

        }

    }

    const createNewUser =  () => {
        if (state.name === '' ||
        state.password === '' ||
        state.email === '') {
            mostrarAlerta();

        } else {
            
            dispatch(createUser(state, props))
            AsyncStorage.setItem('email', state.email)
            setState({
                name: '',
                email: '',
                password: ''
            })
           
            
       
        }
       

    }

    //Alerta de Error
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //Mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )

    }
    return (
        <ScrollView>
        <View style={styles.container}>
        <LinearGradient
                colors={['#1f2333', '#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >
            <View style={styles.header}>

                <Text style={styles.text_header}>Register Now!</Text>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Name"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlerTextChange(val)}
                        onEndEditing={(e) => handlerValidUser(e.nativeEvent.text)}
                    />
                    {newUser.checktextInput ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="purple"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {newUser.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Email</Text>
                <View style={styles.action}>
                    <Feather
                        name="mail"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlerEmailChange(val)}
                        // onEndEditing={(e) => handlerValidUser(e.nativeEvent.text)}
                    />
                    {newUser.checkemailInput ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="purple"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {newUser.isValidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email Invalid.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={newUser.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePassChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updatesecureTextEntry}
                    >
                        {newUser.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {newUser.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                    onPress={createNewUser}
                        style={styles.register}
                    >

                        <Text style={[styles.textRegister, {
                            color: '#fff'
                        }]}>Register</Text>

                    </TouchableOpacity>

                </View>
            </Animatable.View>
            </LinearGradient>
        </View>
        </ScrollView>
    )



}

export default CreateUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292768'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        paddingTop:50,
        letterSpacing:2
    },
    footer: {
        flex: 5,
        backgroundColor: '#EDF7F6',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#EDF7F6',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily:'serif'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontFamily:'serif',
        letterSpacing:2
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontFamily:'serif'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    register: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#1f2333'
    },
    textRegister: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing:2,
        fontFamily:'serif'
    }
})