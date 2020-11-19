import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons';


const Home = (props) => {

    return (
        <View style={style.container}>
        
     
            <View style={style.box1}></View>
            <View style={style.box2}>
                <View style={{ paddingTop: 50, paddingHorizontal: 14 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Image
                                source={require('../screens/images/Logo-04.png')}
                                style={style.Image}
                            />

                        </View>
                        <View>
                            <Text style={style.text}>GO</Text>
                            <Text style={{ fontSize: 19, color: '#fff',  marginTop: 10, marginHorizontal: '2.5%' }}>E-Wallet for the</Text>
                            <Text style={{ fontSize: 19, color: '#FFF',  marginTop: 2, marginHorizontal: '2.5%' }}>gaming comunity</Text>
                        </View>

                    </View>
                </View>


            </View>
            <View style={style.box3}>
                <View style={{ paddingVertical: 20 }}>
                    <TouchableOpacity style={style.create}
                        onPress={() => props.navigation.navigate("CreateUser")} >
                        <Text style={{ fontSize: 16, marginHorizontal: '20%' }}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={style.login}
                        onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '35%' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: '7%'}} onPress={()=>{props.navigation.navigate("ForgotPassword")}}>
                        <Text style={{ fontSize: 12, color: '#FFF', marginTop: 5 }}>Forget your password?</Text></TouchableOpacity>

                </View>

            </View>
            <View style={style.box4}>
            <Octicons
                            // style={style.icon}
                            name="question"
                            color="#FFF"
                            size={25}
                        />

            </View>
            
        </View>

    )

}
export default Home;
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e'
    },
    box1: {
        padding: 20,
        flex: 1
    },
    box2: {
        flex: 5,
    },
    box3: {
        padding: 20,
        flex: 4,
        alignItems: 'center'
    },
    box4: {
        padding: 20,
        flex: 1,
        alignItems:'flex-end',
    },
    Image: {
        width: 150,
        height: 120,
        // borderRadius: 40
    },
    text: {
        fontSize:27,
        color: '#fff',
        fontWeight: 'bold',

        // textAlign: 'center'
    },
    create: {
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    login: {
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFF',
        marginHorizontal:'2%'
    }
});



