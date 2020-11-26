import React, { useEffect, setState, useState } from 'react';
import axios from 'axios';
import {URL} from '@env';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  Button,
  Alert,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { getContacts, postContacts } from '../../Store/actions/contact'

const ContactsList = (props) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localContacts, setLocalContacts] = useState('')
  const [memoryContacts, setMemoryContacts] = useState('')
  const [selectedContact, setSelectedContact] = useState('')
  const [newAlias, setNewAlias] = useState('')


  const dispatch = useDispatch()

  const userRedux = useSelector(state => state.user)
  const userId = userRedux.user.id
  
  const loadContacts = async() => {
    try {
    const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          const contacts = data;
          let newContacts = [];
          
          for (let i = 0; i < contacts.length; i++){
              if(contacts[i]["phoneNumbers"]){
                let add = {userId: userId, alias: contacts[i]["name"], contactPhone: contacts[i]["phoneNumbers"][0].number }
                newContacts.push(add)
              }
           }
            dispatch(postContacts(newContacts))
        }
      }} catch (error) {
        console.log(error, "error")
      }
    } 

  const getContacts = async() => {
      setLoading(true)
      if(userId){
        axios.get(`http://${URL}/api/user/contacts/${userId}`)
        .then((resp) =>{
              setLocalContacts(resp.data.content)
              setMemoryContacts(resp.data.content)
              setLoading(false)
        })
        .catch((error)=>{console.log(error)})
    } 
  } 
  
      useEffect(() => {
        loadContacts()
        getContacts()
        console.log(userId)
        console.log(localContacts)
      }, [])
  
  //funcion para mostrar en el modal los datos del contacto clickeado
  //los leemos desde el estado selectedContact
  const viewContactProfile = ({item}) => {
    setSelectedContact({item})
    console.log(selectedContact)
    setModalVisible(true)
    setEditingContact(false)
  }

  //funcion para renderizar condicionalmente la vista de edicion en el modal
  const editContact = () => {
    setEditingContact(true)
  }

  //funcion para cambiar el alias
  const confirmEditContact = (value) => {
    if(value.length < 1) {
      Alert.alert('The alias must be longer')
    } else {
    console.log(selectedContact.item.alias, " changed to ", value)
    setEditingContact(false)
    }
    
  }

  //funcion para cambiar de contact a favorito
  const editFavourites = () => {
    if (selectedContact.item.status === 'contact') {
      console.log(selectedContact.item.alias, " is now a Favorite")
      }
    
    if (selectedContact.item.status === 'favorite') {
      console.log(selectedContact.item.alias, " is not a Favorite anymore :(")
      }
    }


  //funcion para dar formato a cada celda de contacto en la lista
  let renderItem = ({ item }) => (
    <View style={{ minHeight: 55, padding: 5 }}>
      {item.alias === 'favorite'? <Text>:3</Text> : null}
      <TouchableOpacity onPress={() => viewContactProfile({item})}>
      <Text style={{ color: '#2f363c', fontWeight: 'bold', fontSize: 18 }}>
        {item.alias}
      </Text>
      <Text style={{ color: 'grey', fontWeight: 'bold' }}>
        {item.phone}
      </Text>
      </TouchableOpacity>
    </View>
  );

  //funcion para filtrar contactos cuando se use la searchbar
  let searchContact = (value) => {
    const filteredContact = memoryContacts.filter( contact => {
      let aliasLowerCase = (contact.alias).toLowerCase();
      let searchLowerCase = value.toLowerCase();

      return aliasLowerCase.indexOf(searchLowerCase)> -1
    });
    setLocalContacts(filteredContact)
  }

  return (
    <View style={{ flex: 1}}>
     <SafeAreaView style={{backgroundColor: '#2f363c'}} />
      <TextInput 
      placeholder="Search" 
      placeholderTextColor="#dddddd" 
      style={{
        backgroundColor: '#2f363c', 
        height:50, 
        fontSize:18,
        padding:10,
        color:'white'}}
      onChangeText={(value) => searchContact(value)} 
      />
      <View style={{flex:1}}>
        {loading? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems:'center',
              justifyContent: 'center'
            }}>
            <ActivityIndicator size='large' color='#2f363c' />
          </View>
        ) : null}
          <FlatList
             data={localContacts}
             renderItem={renderItem}
             ListEmptyComponent={ () => 
             <View style={{
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
               marginTop: 50
             }}>
             <Text style={{color:'#2f363c'}}>No contacts found</Text>
             </View>}
           />

      { modalVisible && editingContact === false ? (<View style={style.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
              setEditingContact(false)
          }}>
          <View style={style.centeredView}>
          <View style={style.modalView}>
          <Button
            title="X"
            color="#f194ff"
            onPress={() => {
                setModalVisible(false)
                setEditingContact(false)
                setNewAlias('')
                  }}
          /> 
          <Button
            title="Change Status"
            color="#f194ff"
            onPress={() => editFavourites()}
            />
      
          <Text style={style.modalText}>{selectedContact.item.alias}</Text>
          <Text style={style.modalText}>{selectedContact.item.phone}</Text>
          <Button
          title={"Edit " + selectedContact.item.alias + " alias"}
          color="#f194ff"
          onPress={() => editContact()}
        />
          </View>
        </View>
      </Modal>
      </View>) : null}

      {modalVisible && editingContact ? (<View style={style.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
              setEditingContact(false)
          }}>
          <View style={style.centeredView}>
          <View style={style.modalView}>
          <Button
            title="Cancel"
            color="#f194ff"
            onPress={() => {
                setModalVisible(false)
                setEditingContact(false)
                setNewAlias('')
                  }}
          /> 
          
          <Text>Enter new Alias:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Write new alias for ",  selectedContact.item.alias}
            onChangeText={(value) => setNewAlias(value)}
            value={newAlias}
          />

          <Button
            title="Save Changes"
            color="#f194ff"
            onPress={() => 
              confirmEditContact(newAlias)
              }
          />

          </View>
        </View>
      </Modal>
      </View>) : null}

      </View>
    </View>
    )
}

const style = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      alignItems: 'center',
      justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default ContactsList;