import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './Store/store'

import Home from './screens/Home'
import CreateUser from './screens/Users/CreateUser'
import Faq from './src/componentes/Faq'
import Faq2 from './src/componentes/Faq2'
import Login from './screens/Login'
import ForgotPassword from './screens/ForgotPassword'
import CompleteDataUser from './screens/Users/CompleteDataUser'
import InsertPin from './screens/InsertPin'
import RegisterAdress from './screens/Users/RegisterAdress'
import UserProfile from './screens/Users/UserProfile'
import MyProducts from './screens/Users/MyProducts'
import MyData from './screens/MyData'
import ConnectionPages from './screens/ConnectionPages'

import RechargeMoney from './screens/RechargeMoney'
import EnviarDinero from './screens/EnviarDinero'
import ShowCreditCards from './screens/Users/ShowCreditCards'
import CreditCardView from './screens/CreditCardView';
import CreditCard from './src/componentes/CreditCard';
import ContactsList from './screens/Users/ContactsList'
import TransactionsView from './screens/Users/TransactionsView'
import TransactionItem from './screens/Users/TransactionItem'

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
        headerTitleStyle: 'bold',
        headerTitle:''
      }}>

      {/* este nos va a permitir crear las pantallas */}
      
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="CreateUser"
        component={CreateUser}
       />
      <Stack.Screen name="UserProfile"
        component={UserProfile}
        options={{
          title: '',
        }} />
      <Stack.Screen name="InsertPin" component={InsertPin}
        options={{
        
          headerLeft: null
        }}

      />
      <Stack.Screen name="CompleteDataUser" component={CompleteDataUser}
       
      />
      <Stack.Screen name="RegisterAdress" component={RegisterAdress}
       
      />
      
      <Stack.Screen name= "Faq" component={Faq2}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RechargeMoney"
        component={RechargeMoney}
       />
      <Stack.Screen name="EnviarDinero" component={EnviarDinero}/>
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="ContactsList" component={ContactsList}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
      />
     <Stack.Screen name="MyData" component={MyData}/>
     <Stack.Screen name ="ConnectionPages" component={ConnectionPages}/>
     <Stack.Screen name="ShowCreditCards" component={ShowCreditCards}/>
     <Stack.Screen name="CreditCardView" component={CreditCardView}/>
     <Stack.Screen name="CreditCard" component={CreditCard}/>
     <Stack.Screen name="TransactionsView" component={TransactionsView}/>
     <Stack.Screen
              name="TransactionItem"
              component={TransactionItem}
              initialParams={{ item: 1}}
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
