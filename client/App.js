import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './Store/store'

import Home from './screens/Home'
import CreateUser from './screens/Users/CreateUser'
import Faq from './src/componentes/Faq'
import Login from './screens/Login'
import ForgotPassword from './screens/ForgotPassword'
import CompleteDataUser from './screens/Users/CompleteDataUser'
import InsertPin from './screens/InsertPin'
import RegisterAdress from './screens/Users/RegisterAdress'
const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e1e',

        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: 'bold'
      }}>
      {/* este nos va a permitir crear las pantallas */}

      <Stack.Screen name="Home" component={Home}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name="CreateUser"
        component={CreateUser}
        options={{
          title: '',
        }} />
        <Stack.Screen name="InsertPin" component={InsertPin}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen name="CompleteDataUser" component={CompleteDataUser}
        options={{
          headerTitle: ''
        }}
      />
       <Stack.Screen name="RegisterAdress" component={RegisterAdress}
        options={{
          headerTitle: '',
        }}
      />
      {/* <Stack.Screen name= "Faq" component={Faq}/> */}
      <Stack.Screen name="Login" component={Login}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
        }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
      />
     
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <MyStack/> */}
        <MyStack />
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
