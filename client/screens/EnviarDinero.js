import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  FlatList,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import { URL } from '@env'
// import { getContacs } from '../Store/actions/contact'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTransactions} from '../Store/actions/transactions'
import { getBalance } from '../Store/actions/account'


const EnviarDinero = (props) => {
  const [monto, setMonto] = useState("");
  const [msj, setMsj] = useState('');
  const [contact, setContact] = useState('')
  const [user, setUser] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [contacList, setContactList]=useState('')
  const dispatch = useDispatch()
  const usuario=useSelector(store=>store.user)
  const userId =usuario ? usuario.user.id :''
  const sendMoney = (monto, mensaje) => {
    const phoneContact = contact !== '' ? contact.phone : ''
    const phoneUser = user ? user.data.phone : ''
    console.log('params',phoneUser, phoneContact, monto,msj)
    axios.post(`http://${URL}/api/transactions/send`, { phoneUser, phoneContact, amount:monto, description:msj })
      .then((resp) => {
        // console.log(resp)
        if(resp){
          Alert.alert(
            'Success', 
            'Transfer Complete', 
            [{
                text: 'OK', //Arreglo de botones
                onPress: () => { 
                  usuario ? dispatch(getTransactions(usuario.user.id)) : null;
                  usuario ? dispatch(getBalance(usuario.user.id)) :null
                  setMonto('')
                  setMsj('')
                  setContact('')
                   props.navigation.navigate('UserProfile') },

            }
        ],
        )
        }
      })

  }
  const onLoad = async () => {
    try {
      var usuario = await AsyncStorage.getItem('usuario')
      setUser((JSON.parse(usuario)))
    } catch (error) {
      console.log(error)


    }

  }
  useEffect(() => {
    onLoad()
    // if(modalVisible)
    // dispatch(getContacs())
  },[])
  const contacts=()=>{
    axios.get(`http://${URL}/api/user/contacts/${userId}`)
      .then((resp) =>{
      setContactList(resp.data.content)})
  }
 
  return (
    <ScrollView style={styles.contenedorPrincipal}>
      <View style={styles.container}>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={() => {
              contacts()
              setModalVisible(true);
            }}
          >
            <Text style={{color:'#fff', fontFamily:'serif'}}> Select Contact</Text>
          </TouchableOpacity>
          {/* <Text>{contact !==''?contact.}</Text> */}
        </View>
        <View >
          <Modal
          
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Warning","no selected contact",[
                {
                  text:'Cancel',
                  onPress:()=>setModalVisible(true)
                },
                {
                  text:'OK',
                  onPress:()=> setModalVisible(false)
                }
              ]);
              
            }}
          >
              <View style={{ flex: 1, backgroundColor:'#292768' }}>
                <View>
                  <Text style={styles.modalText}>My Contacs</Text>
                  
                  <FlatList
                    data={contacList}
                    inverted
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      return (
                        <TouchableHighlight
                          onPress={() => {
                            setContact(item)
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <View style={styles.panelItemContainer} >
                            <View style={{ flexDirection: 'column' }}>
                              <Text style={{ fontSize: 20, fontFamily:'serif', color:'#fff', paddingLeft:10 }} >{item.alias}</Text>
                              <Text style={{  fontSize: 17, fontFamily:'serif', color:'#fff', paddingLeft:30, marginTop:5}}>+{item.phone}</Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )
                    }} 
                    />
                </View>
              </View>
          </Modal>
        </View>
        <View>
          <View style={{alignItems:'flex-start', justifyContent:'center'}}>
            <Text style={{fontSize:20, marginHorizontal:20, paddingTop:30, color:'#fff', fontFamily:'serif'}}>Insert Amount:</Text>
          </View>
          <View style={styles.dinero}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontSize:35, marginTop:30, color:'#fff', fontFamily:'serif'}}>$</Text>
              <TextInput
                style={styles.balance}
                keyboardType="numeric"
                defaultValue={monto}
                autoFocus
                onChangeText={(value) => setMonto(value)}
              />
            </View>
          </View>
          <View style={styles.inputService}>
            <TextInput
              style={{color:'#fff', width:'100%', height:'100%',fontFamily:'serif' }}
              placeholder={"Write your message ..."}
              placeholderTextColor="#C7C7CD"
              multiline
              defaultValue={msj}
              onChangeText={value => setMsj(value)}
            />
          </View>
          <View style={styles.inputAmount}>
            <TouchableOpacity style={styles.button}
              onPress={() => sendMoney(monto, msj)} activeOpacity={0.7}>
              <View style={{ flexDirection: 'row', alingItems: 'center' }}>
              <Text style={{ fontSize: 17,fontFamily:'serif', color: '#FFF', marginHorizontal: '15%', letterSpacing:2 }}>Transfer</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#292768'
  },
  dinero: {
    alignItems:'center'
  },
  contact: {
    width: 150,
    height: 30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#bb59fa",
    color:'#fff',
    alignSelf: "center",
    borderRadius:10,
    marginTop:50,
    marginBottom:30
    // marginTop: -145,
  },
  panelItemContainer: {
    borderWidth: 0.7,
    borderColor: '#BB59FA',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 20,
    marginHorizontal: '3%'
    
  },
  cont: {
    color: "#1e1e1e",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  balance: {
    flexDirection: 'row',
    height: 50,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 35,
    // margin: 10,
    fontSize: 40,
    fontWeight: 'bold',
    width: 150,
    backgroundColor: '#292768',
    alignItems: 'flex-start',
    color: '#fff',
    borderBottomWidth: 3,
    borderColor: '#BB59FA',
  },
  inputAmount: {
    marginTop: 50,
    alignItems: 'center'
  },
  top: {
    width: "100%",
    alignSelf: "center",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#292768'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop:30,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    color:'#fff',
    fontFamily:'serif'
  },
  button: {
    width: 190,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#bb59fa',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 12,
    }
  },
  inputService:{
    alignItems:'flex-start',
    backgroundColor:'#13124E',
    height:55,
    marginTop:60,
    marginLeft:20,
    marginRight:20,
    borderWidth:2,
    borderColor:'#BB59FA',
    borderRadius:10
    
  }

  });

export default EnviarDinero;
