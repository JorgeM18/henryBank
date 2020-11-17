import { View, Button, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native'


const ContactsList = (props) => {

  return (
    <ScrollView>
         <View>
          <TextInput placeholder="Buscar contacto..."></TextInput>
          <Button
            title="Buscar"
            color="#f194ff"
             onPress={() => Alert.alert('Buscar')}
            />
          </View>
          <View>
              <Text>Aca van los contactos</Text>
            </View>
    </ScrollView>
  );
}


export default ContactsList;