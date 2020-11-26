import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Dimensions,ScrollView, Animated } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {FAB, Text} from 'react-native-paper'
const Texta = require('react-native-svg').Text



const Home = (props) => {
    const [fadeIn, setFadeIn]=React.useState(new Animated.Value(0))
    React.useEffect(()=>{
        Animated.timing(fadeIn,
            {
                toValue:1,
                duration:2000,
                useNativeDriver:true
            }
        ).start();
    })

    return (
        <View style={style.container} >
            <Animated.View style={{opacity:fadeIn}}>
            <LinearGradient
                colors={['#1f2333', '#1f2333','#1f2333', '#7847e5', '#BB59FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                height={Dimensions.get('window').height}
            >

                <View style={style.box1}>
                    <View style={{ paddingTop: 30, paddingHorizontal: 14, alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           

                                <Animatable.Image
                                    animation="fadeInDown"
                                    duration={500}
                                    // delay={delay}
                                    easing="ease-in"
                                    // iterationCount="infinite"
                                    useNativeDriver
                                    source={require('./images/Logo-04.png')}
                                    style={{
                                        ...style.Image,
                                        backfaceVisibility: 'hidden',
                                    }}
                                />

               


                        </View>
                    </View>
                </View>
                <View style={{...style.box2, marginTop:30}}>
                    <View>
                        <Text style={style.text}>GO</Text>
                        <Text style={{ fontSize: 19, color: '#fff', marginTop: 10, marginHorizontal: '2.5%',fontFamily:'serif' }}>E-Wallet for the gaming comunity</Text>
                      
                    </View>

                </View>
                <View style={{...style.box3, marginTop:30}}>
                    <View style={{ paddingVertical: 20 }}>
                        <TouchableOpacity style={{...style.but, ...style.create}}
                            onPress={() => props.navigation.navigate("CreateUser")} >
                            <Text style={{...style.text2, marginHorizontal: '25%'}}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{...style.login, ...style.but}}
                            onPress={() => props.navigation.navigate("Login")}>
                            <Text style={{...style.text2, color:'#FFF',marginHorizontal: '30%'}}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: '7%' }} onPress={() => { props.navigation.navigate("ForgotPassword") }}>
                            <Text style={{ fontSize: 12, color: '#FFF', marginTop: 7, fontFamily:'serif' }}>Forgot your password?</Text></TouchableOpacity>

                    </View>
                  
                </View>
                
                <View style={style.box4}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Faq2')}>
                    <Feather
                            style={style.icon}
                            name="help-circle"
                            color="#FFF"
                            size={25}
                        />
                    </TouchableOpacity>

                </View>

            </LinearGradient>
            </Animated.View>
        </View>

    )

}
export default Home;
const style = StyleSheet.create({
    container: {
        flex: 1,

    },
    box1: {
        padding: 20,
        flex: 1,
        marginTop:10
    },
    box2: {
        flex: 5,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    box3: {
        padding: 20,
        flex: 6,
        alignItems: 'center',
        marginTop:10
    },
    box4: {
        // padding: 20,
        flex: 1,
        alignItems: 'flex-end',
        paddingRight:10,
        paddingBottom:10
    },
    Image: {
        width: 180,
        height: 200,
    },
    text: {
        fontSize: 27,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'serif',
        marginTop:20
    },
    text2:{
        fontSize: 16,
        fontFamily:'serif',
        letterSpacing:1
    },
    but:{
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center'

    },
    create: {
        backgroundColor: '#FFF',
    },
    login: {
        backgroundColor: '#1f2333',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        marginHorizontal: '2%',
        marginLeft:20
    },
    fab: {
        position: 'absolute',
        //  margin: 20,
        right: 3,
        bottom: 40
      }
});


