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
  FlatList
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import { URL } from '@env'
// import { getContacs } from '../Store/actions/contact'
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
                onPress: () => {  props.navigation.navigate('UserProfile') },

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
    <View style={styles.contenedorPrincipal}>
      <View style={styles.container}>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={() => {
              contacts()
              setModalVisible(true);
            }}
          >
            <Text> Select Contact</Text>
          </TouchableOpacity>
          {/* <Text>{contact !==''?contact.}</Text> */}
        </View>
        <View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <ScrollView>
              <View style={{ flex: 1, marginTop: 30 }}>
                <View>
                  <Text style={styles.modalText}>My Contacs</Text>
                  <FlatList
                    data={contacList}
                    inverted
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => {
                      return (
                        <TouchableHighlight
                          onPress={() => {
                            setContact(item)
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <View style={styles.panelItemContainer} >
                            <View style={{ flexDirection: 'row', alingItems: 'center' }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Name:</Text>
                              <Text style={{ fontSize: 15 }} >{item.alias}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alingItems: 'center', marginLeft: 10 }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Phone:</Text>
                              <Text style={{ fontSize: 15 }}>{item.phone}</Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )

                    }} />
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
        <View>
          <View style={styles.dinero}>
            <Text style={styles.balance}>$</Text>
            <TextInput
              style={styles.balance}
              keyboardType="numeric"
              defaultValue={monto}
              autoFocus
              onChangeText={(value) => setMonto(value)}
            />
          </View>
          <View style={styles.inputService}>
            <Text style={styles.cont}>AMOUNT</Text>
            <TextInput
              placeholder={"Write your message ..."}
              placeholderTextColor="#C7C7CD"
              multiline
              onChangeText={value => setMsj(value)}
            />
          </View>
          <View style={styles.inputAmount}>
            <TouchableOpacity style={styles.button}
              onPress={() => sendMoney(monto, msj)} activeOpacity={0.7}>
              <View style={{ flexDirection: 'row', alingItems: 'center' }}>
              <Text style={{ fontSize: 19, color: '#FFF', marginHorizontal: '15%' }}>TRANSFER</Text>
              <Icon name="money" size={20} color="white" style={{justifyContent:'flex-end'}} />
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
  },
  dinero: {

    backgroundColor: "#FFFFFF",
    paddingTop: 2,
    flexDirection: "row",
    marginHorizontal: "3%",
  },
  contact: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    // marginTop: -145,
  },
  panelItemContainer: {
    borderWidth: 0.7,
    borderColor: '#666',
    padding: 16,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: "center",
    position: "relative",
    bottom: 8,
    padding: 6,
    paddingLeft: 19,
    paddingRight: 19,
    fontSize: 30,
    marginTop: 30,
    borderRadius: 10,
  },
  inputAmount: {
    marginTop: 90,
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
    width: "90%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FFF",
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
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    marginHorizontal: '10%',
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 12,
    }
  }
  });

export default EnviarDinero;
