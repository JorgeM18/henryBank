import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import {URL} from '@env'
import {getContacs} from '../Store/actions/contact'




const EnviarDinero = (props) => {
  const [monto, setMonto] = useState("");
  const [msj, setMsj]=useState('');
  const [contact, setContact]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch=useDispatch()
  const searchContact = () => {
    Alert.alert("Select");
  };
  const sendMoney=(monto, mensaje)=>{
    // axios.post(`http://${URL}/api/transactions/send`)
    // .then((resp)=>{
    //   console.log(resp)

    // })

  }
  useEffect(()=>{
    if(modalVisible)
    dispatch(getContacs())
  })
  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.container}>
        <View style={styles.contact}>
          <TouchableOpacity
             onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text>Contact</Text>
          </TouchableOpacity>
        </View>
        <View>
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{flex:1, marginTop:30}}>
          <View>
            <Text style={styles.modalText}>My Contacs</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
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
              onChangeText={value=>setMsj(value)}
            />
          </View>
          <View style={styles.inputAmount}>
            <Button
            // onPress={()=>sendMoney(monto, msj)}
              buttonStyle={{
                backgroundColor: "green",
                width: 200,
                alignSelf: "center",
                borderRadius: 10,
              }}
              icon={<Icon name="money" size={15} color="white" />}
              iconRight
              title="TRANSFER    "
            />
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
    fontSize:15
  }
});

export default EnviarDinero;
