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
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
    
    <View style={style.contact}>
    {item.alias === 'favorite'? <Octicons name="heart" color="#FFF" size={25} style={{width: '10%'}}/> : null}
      <TouchableOpacity onPress={() => viewContactProfile({item})}>
      <Text style={{ 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: '24%'
        
         }}>
        {item.alias}
      </Text>
      <Text style={{ color: 'grey', fontWeight: 'bold', marginLeft: '24%' }}>
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
    <View style={style.container}>
     <SafeAreaView style={{backgroundColor: '#292768'}} />
     <View style={style.searchBar}>
     <Octicons name="search" color="#FFF" size={25} />
      <TextInput 
      placeholder="Search" 
      placeholderTextColor="#dddddd" 
      style={{
        backgroundColor: '#1f1d5e',
        borderColor: '#bb59fa', 
        borderWidth:1,
        height:40, 
        fontSize:18,
        color:'white',
        width: '88%',
        marginHorizontal:'4%',
        paddingLeft: 20,
        borderRadius: 20}}
      onChangeText={(value) => searchContact(value)} 
      />
      </View>
      <View style={{width: '100%'}}>
        {loading? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems:'center',
              justifyContent: 'center'
            }}>
            <ActivityIndicator size='large' color='#fff' />
          </View>
        ) : null}
          <FlatList
             data={localContacts}
             renderItem={renderItem}
             keyExtractor={(item, index) => index.toString()}
             ListEmptyComponent={ () => 
             <View style={{
               flex: 1,
               marginTop: 50
             }}>
             <Text style={{color:'#fff'}}>No contacts found</Text>
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
          <View style={style.modalView}>
          <View style={style.topButtons}>
            
            <TouchableOpacity onPress={() => editFavourites()}>
              <FontAwesome5
                
                name="star"
                color="#FFF"
                size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setModalVisible(false)
                setEditingContact(false)
                setNewAlias('')
                  }}>
              <FontAwesome5
                style={style.xButton}
                name="times"
                color="#FFF"
                size={25}
                />
            </TouchableOpacity>
          </View>
          <Text style={style.modalText}>{selectedContact.item.alias}</Text>
          <Text style={style.modalText}>{selectedContact.item.phone}</Text>
          <TouchableOpacity style={style.editAlias} onPress={() => editContact()}>
              <Text style={{color:'#fff'}}>Edit Alias</Text>
            </TouchableOpacity>
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
          <View style={style.modalView}>

          <TouchableOpacity onPress={() => {
                setModalVisible(false)
                setEditingContact(false)
                setNewAlias('')
                  }}>
              <FontAwesome5
                style={style.xButton2}
                name="times"
                color="#FFF"
                size={25}
                />
            </TouchableOpacity>
          
          <Text style={style.modalText}>Enter new Alias:</Text>
          <TextInput
            placeholderTextColor="white" 
            style={{
              backgroundColor: '#1F2333',
              borderColor: '#1f1d5e', 
              borderWidth:1,
              height:40, 
              fontSize:14,
              width: '100%',
              paddingLeft: 20,
              marginBottom: '10%',
              borderRadius: 20}}
            placeholder={"write new alias..."}
            onChangeText={(value) => setNewAlias(value)}
            value={newAlias}
          />
          <TouchableOpacity style={style.editAlias} onPress={() => confirmEditContact(newAlias)}>
              <Text style={{color:'#fff'}}>Save Changes</Text>
          </TouchableOpacity>
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
      backgroundColor: '#1F2333',
      alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#1F2333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: '2%'
    
  },
  contact: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',
    margin: '2%',
    minHeight: 55, 
    padding: 10, 
    borderColor: '#bb59fa',
    borderWidth: 1,
    borderRadius: 5
    
  },
  modalView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 20,
    backgroundColor: '#bb59fa',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 5
  },
  topButtons: {
    flexDirection: 'row',
    marginTop:'2%',
    marginBottom: '5%'
  },
  xButton: {
    marginLeft: '88%'
  },
  xButton2: {
    marginLeft: '92%'
  },
  modalText: {
    color: '#fff',
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  editAlias: {
    backgroundColor: '#1f1d5e',
    marginTop: '5%',
    borderRadius: 5,
    color: 'white',
    padding: 10
  } 
})

export default ContactsList;