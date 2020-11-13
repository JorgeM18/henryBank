import React from 'react'
import {useDispatch} from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {logout} from '../../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage';




const ProfileUser = (props) => {
    const dispatch=useDispatch()

    const logHome = () => {
        AsyncStorage.clear();
        // dispatch(logout())
        props.navigation.navigate('Home');
        return;
    }

    const Logout= () =>{
        Alert.alert(
            'Logout', //titulo
            'Esta seguro de cerrar sesion', //Mensaje
            [{
                text: 'OK', //Arreglo de botones
                onPress: ()=> {logHome()}
            }],
        
        )
    }

    
   
    return (
     
              <View style={style.container}>
                    
            <View style={style.banner}>
                <View style={{alignItems:'flex-end', marginHorizontal:'3%'}}>
                    <TouchableOpacity onPress={()=>Logout()}>
                    <Foundation
                        name='power'
                        color='#FFF'
                        size={30}
                />
                    </TouchableOpacity>
                
           
                </View>
                <View style={{ paddingHorizontal: 14 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 12, color: '#fff', opacity: 0.6, marginTop: 2, marginHorizontal: 17 }}>Hola name</Text>
                            <Image
                                source={require('../images/favicon.png')}
                                style={style.Image}
                            />

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={style.text}>$5,634.12</Text>
                            <Text style={{ fontSize: 12, color: '#fff', opacity: 0.6, marginTop: 2, marginHorizontal: '2.5%' }}>Balance de mi cuenta</Text>
                        </View>

                    </View>
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#FFF', flexDirection:'row'}}>
                    <Text style={{fontSize:20, marginVertical:'3%'}}>General</Text></View>
            <View style={style.box2}>
                <View style={style.subbox1}>
                    <Text>Income</Text>
                    <Text style={style.text1}>$24454</Text>

                </View>
                <View style={style.subbox1}>
                <Text >gastos</Text>
                    <Text style={style.text1}>$24454</Text>
                </View>
                
            </View>
            <View style={{justifyContent:'flex-end', alignItems:'center', backgroundColor:'#FFF', flexDirection:'row', paddingRight:70}}>
                <TouchableOpacity style={style.link}><Text >1 Día</Text></TouchableOpacity>
                <TouchableOpacity style={style.link}><Text >7 Dias</Text></TouchableOpacity>
                <TouchableOpacity style={style.link}><Text >30 Días</Text></TouchableOpacity>
                <TouchableOpacity style={style.link}><Text >6 Meses</Text></TouchableOpacity>
                
           </View>


            <View style={style.box3}>
                <View>
                    <TouchableOpacity style={style.button1}>
                    <Feather
                            style={style.icon}
                            name="send"
                            color="#FFF"
                            size={30}
                        />
                        <Text style={{ fontSize: 10, color: '#FFF', marginHorizontal: '2%', marginVertical:'5%' }}>Transacciones</Text>
                    </TouchableOpacity>


                </View>
                <View>

                    <TouchableOpacity style={style.button1}>
                    <Feather
                            style={style.icon}
                            name="activity"
                            color="#FFF"
                            size={35}
                        />
                        <Text style={{ fontSize: 10, color: '#FFF', marginHorizontal: '7%', marginVertical:'5%'}}>Estadisticas</Text>
                    </TouchableOpacity>


                </View>
                <View style={{}}>
                   
                    <TouchableOpacity style={style.button1}>
                    <Feather
                         style={style.icon}
                        name="globe"
                        color="#FFF"
                        size={30}
                    />
                        <Text style={{ fontSize: 10, color: '#FFF', marginHorizontal: '15%', marginVertical:'5%'}}>Mis Datos</Text>
                    </TouchableOpacity>


                </View>
                <View>
                    <TouchableOpacity style={style.button1}>
                    <Feather
                         style={style.icon}
                        name="credit-card"
                        color="#FFF"
                        size={30}
                    />
                        <Text style={{ fontSize: 10, color: '#FFF', marginHorizontal: '2%', marginVertical:'5%' }}>Mis Productos</Text>
                    </TouchableOpacity>


                </View>
            </View>
            <View style={style.box4}>
                <View>
                    <TouchableOpacity style={style.button2}>
                    <Feather
                            name="arrow-down-circle"
                            color="#FFF"
                            size={20}
                        />  
                    
                        <Text style={{ fontSize: 12, color: '#FFF', marginHorizontal: '3%' }}>Recargar Dinero</Text>
                    </TouchableOpacity>


                </View>
                <View>
                    <TouchableOpacity style={style.button2}>
                    <Feather
                            name="arrow-up-circle"
                            color="#FFF"
                            size={20}
                        />                     
                        <Text style={{ fontSize: 12, color: '#FFF', marginHorizontal: '3%' }}>Enviar Dinero</Text>
                    </TouchableOpacity>


                </View>

            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e'
    },
    banner: {
        height: 250,
        flex: 2,//el componente crece de arriba hacia abajo con el espacio disponible
       
    },
    box2: {
        flex: 2,
        backgroundColor: '#FFF',
        flexDirection: 'row',

        // flexDirection:'row',
        // alignItems:'center',
    },
    link:{
        marginHorizontal:'3%'
    },
    box3: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    box4: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    subbox1: {
        flex: 1,
        backgroundColor: '#F4EDE2',
        // flexWrap: 'wrap',
        alignItems:'center',
        height:90,
        justifyContent:'center',
        marginHorizontal:'3%',
        marginVertical:'5%',
        borderWidth:1,
        borderColor:'#CFC9C0',
        borderRadius:8
    },
    text1: {
        fontSize: 25,
        color: 'black',
       
    },
    icon:{
        marginVertical:'10%', 
        marginHorizontal:'22%'
    },
    text: {
        fontSize: 35,
        color: '#FFF',
        marginHorizontal: '15%',
        fontWeight: 'bold'
    },
    Image: {
        width: 100,
        height: 100,
        // borderRadius: 40
    },
    button1: {
        width: 70,
        height: 70,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#1e1e1e',
        justifyContent: 'flex-end',
        borderRadius:8,
    },
    button2: {
        width: 130,
        height: 45,
        marginHorizontal: '10%',
        color:'#FFF',
        marginVertical: '5%',
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 20
    },
    contenedor: {
        marginHorizontal: 10
    },
    ciudad: {
        width: 250,
        height: 300,
        marginRight: 10 //da un margen entre las imagenes

    },
    mejores: {
        width: '100%', //para que la imagen tome toda la pantalla el componente padre debera tener un fleDirection: 'row'
        height: 200,
        marginVertical: 5

    },
    listado: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'

    },
    listadoItems: {
        flexBasis: '49%'
    }

})

export default ProfileUser;