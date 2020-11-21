import React, { useEffect, setState, useState } from 'react';
import axios from 'axios';
import {URL} from '@env';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getContacts from '../../Store/actions/contact'

const ContactsList = (props) => {
  const [user, setUser]=useState('')
/*    const contactosHardcodeados = [
    {alias: 'Bruno Gallardo', phone: '+542974155305', status:'favorite'},
    {alias: 'Cesar Contreras', phone: '+5429746545', status:'contact'},
    {alias: 'Gonzalo Sundblad', phone: '+546876513566', status:'contact'},
    {alias: 'Ex Tóxico', phone: '+54222155305', status:'blocked'},
    {alias: 'Flor G', phone: '+540114155305', status:'contact'},
    {alias: 'Carlos Bono', phone: '+54297411105', status:'contact'}, 
    {alias: 'Mamá', phone: '+54297445835', status:'favorite'},
    {alias: 'Papá', phone: '+542234634', status:'favorite'},
    {alias: 'Mica Salguero', phone: '+542974155', status:'contact'}
] */ 
  const dispatch = useDispatch()
  const onLoad =  () => {

         AsyncStorage.getItem('usuario')
         .then((usuario)=>{
          setUser((JSON.parse(usuario)))
          console.log(user)
         }) 
}
const userId =user!==''? user.data.id:''

  // const userId = useSelector(state => state.user.user["id"])
  console.log("USUARIO REDUX CONTACT LIST", userId)
  //const contactsFromStore = useSelector(state => state.contacts)
 const contactos=useSelector(store=>store.user.contacts)
 console.log('CONTACTOS', contactos)
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false)
  const [localContacts, setLocalContacts] = useState('')
  const [memoryContacts, setMemoryContacts] = useState('')
  const contacts=()=>{
    // <ActivityIndicator size='large' color='#2f363c'/>
    setLoading(true)
    if(userId){
      axios.get(`http://${URL}/api/user/contacts/${userId}`)
      .then((resp) =>{
            console.log('Se pidieron los contactos')
            setLocalContacts(resp.data.content)
            setMemoryContacts(resp.data.content)
            setLoading(false)
      })
      .catch((error)=>{console.log(error)})
    }
   
  }
  

  useEffect(() => {
    onLoad()  
    // contacts()
  //  userId ? dispatch(getContacts(userId)):''
  // dispatch(getContacts(1))
    setLoading(true)
   
    }, []);
  

 let renderItem = ({ item }) => (
    <View style={{ minHeight: 55, padding: 5 }}>
      <Text style={{ color: '#2f363c', fontWeight: 'bold', fontSize: 18 }}>
        {item.alias}
      </Text>
      <Text style={{ color: 'grey', fontWeight: 'bold' }}>
        {item.phone}
      </Text>
    </View>
  );

  let searchContact = (value) => {
    //setText(value)
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
      <TouchableOpacity onPress={()=>contacts()}><Text></Text></TouchableOpacity>
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
  }
})

/* const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
}; */

//export default connect(mapStateToProps, {})(ContactsList);
export default ContactsList;