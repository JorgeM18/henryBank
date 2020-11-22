import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { connect } from "react-redux";
import {getCreditCards, deleteCard} from './../../Store/actions/cards'




const ShowCreditCards = ({getCreditCards, deleteCard, cards, navigation}) => {
    


const handleCard = () => {
  
    navigation.navigate('CreditCard')
}

const desvincularTarjeta = (i) => {

    Alert.alert(
        "Alerta",
        "Do you like to unlink this card?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => deleteCard(i)}
        ],
        { cancelable: false }
      );
    
    
    
}



useEffect(() => {
    
    getCreditCards()
}, [])

useEffect(() => {
   console.log('state-------------', cards)
}, [cards])
   
    return (
     
        <View style={style.container}>
                    
            <View style={style.banner}>
                <View style={{ paddingHorizontal: 14 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 10, color: '#fff', opacity: 0.6, marginTop: 2, marginHorizontal: 17 }}></Text>
                            <FontAwesome5
                                    style={style.head}
                                    name="credit-card"
                                    color="#FFF"
                                    size={30}
                                />

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={style.text}>My Cards</Text>
                        </View>

                    </View>
                </View>
            </View>
{/* ------------------------------ */}
        {cards ? cards.map((e,i) => 
                <View style={style.box2}>
                    <View style={style.subbox1} >
                            <TouchableOpacity>
                            <Image
                                    source={require('./../images/card-front3.png')}
                                    resizeMode={"cover"}
                                    scale={0.3}
                                    style={{width: 75, height: 45, borderRadius: 10, marginLeft: '10%'}}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: '#F6F2FC', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>{'... '+e.number.substring(15,19)}</Text>
                            <Text style={{ fontSize: 16, color: '#F6F2FC', marginHorizontal: '2%', marginVertical:'5%', fontWeight: 'bold', paddingLeft: 10 }}>{e.name}</Text>
                            <TouchableOpacity onPress={() => desvincularTarjeta(i)}>
                                {/* <FontAwesome5
                                        style={style.head}
                                        name="credit-card"
                                        color="#FFF"
                                        size={5}
                                    /> */}
                                    <Text style={style.button3}>x</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            
            ): 
              (' ')
            }
            
            {/* ------------------------------ */}

            {cards && cards.length > 0 ? ( <View style={style.box2}>
                </View>) : (
                    <View style={style.box2}>
                    <View style={style.subbox1} >
                        <Text style={{ fontSize: 18, color: '#f6f2fc', fontWeight: 'bold', marginLeft: 25, marginTop: 8, marginBottom: 2, paddingHorizontal: '10%', paddingVertical: '10%'}}>No linked card</Text>
                    </View>
                    </View>
                )
            }

           

            
            <View style={style.box4}>
                    <TouchableOpacity style={style.button2} onPress={handleCard }>
                            <Feather
                                    name="arrow-up-circle"
                                    color="#FFF"
                                    size={20}
                                />                     
                               
                            
                    <Text style={{ fontSize: 18, color: '#f6f2fc', fontWeight: 'bold', marginLeft: 25 }}>Link a Card</Text>
                    </TouchableOpacity>
            </View>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1d5e',
        // marginTop: '15%'
    },
    banner: {
        height: 250,
        flex: 1,//el componente crece de arriba hacia abajo con el espacio disponible
       
    },
    box2: {
        flex: 1,
        backgroundColor: '#282366',
        // flexDirection: 'row',

        // flexDirection:'row',
        // alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100
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
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row'
    },
    subbox1: {
        flexDirection: 'row',
        backgroundColor: '#282366',
        
        alignItems:'center',
        height:80,
        justifyContent: 'flex-start',
        marginHorizontal:'5%',
        marginVertical:'3%',
        borderWidth:1,
        borderColor:'#BB59FA',
        borderRadius:8
    },
    subbox2: {
        flexDirection: 'row',
        backgroundColor: '#F4EDE2',
        
        alignItems:'center',
        alignSelf: 'center',
        height:80,
        justifyContent: 'center',
        marginTop: '15%',
        marginHorizontal:'15%',
        marginVertical:'13%',
        borderWidth:1,
        borderColor:'#CFC9C0',
        borderRadius:8
    },

    text1: {
        fontSize: 20,
        color: 'black',
       
    },
    icon:{
        marginVertical:'10%', 
        marginHorizontal:'22%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginHorizontal: '8%',
        paddingTop:40,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    head: {
        width: 50,
        height: 50,
        paddingLeft: 15,
        paddingTop: 18
        
    },
    button1: {
        width: 65,
        height: 65,
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#1e1e1e',
        justifyContent: 'center',
        borderRadius:8,
    },
    button2: {
        flexDirection: 'row',
        // width: 130,
        // height: 45,
        marginTop: '10%',
        marginHorizontal: '20%',
        alignSelf:'center',
        color:'#FFF',
        marginVertical: '5%',
        backgroundColor: '#1f1d5e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button3: {
        width: 20,
        height: 20,
        marginLeft: 8,
        paddingLeft: 6,
        paddingTop: 0,
        paddingBottom:4,
        backgroundColor: '#7D3EE7',
        color: '#fff',
        borderRadius: 5,
        alignSelf: 'center'
    }

  

})


const mapStateToProps = (state) => {
    return {
      cards: state.card.cards
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getCreditCards: () => dispatch(getCreditCards()),
      deleteCard: (numCard) => dispatch(deleteCard(numCard)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowCreditCards);