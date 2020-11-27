import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/store';
import StackScrrens from './screens/StackScrrens';
import StackScreenUser from './screens/StackScreenUser';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import RechargeMoney from './screens/RechargeMoney'
import EnviarDinero from './screens/EnviarDinero'
import ShowCreditCards from './screens/Users/ShowCreditCards'
import CreditCardView from './screens/CreditCardView';
import CreditCard from './src/componentes/CreditCard';
import ContactsList from './screens/Users/ContactsList'
import RecoveryPassword from './screens/RecoveryPassword'
import TransactionsView from './screens/Users/TransactionsView'
import TransactionItem from './screens/Users/TransactionItem'
import Buy_PlayStore from './screens/Buy_PlayStore'
import Buy_Steam from './screens/Buy_Steam'
import Buy_PlayStation from './screens/Buy_PlayStation'
import Buy from './screens/Buy'

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
      <Stack.Screen name="EnviarDinero" component={EnviarDinero}
        options={{
          headerTitle: '',
        }}
      />
      {/* <Stack.Screen name= "Faq" component={Faq}/> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RechargeMoney"
        component={RechargeMoney}
       />
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="ContactsList" component={ContactsList}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
      />
     <Stack.Screen name="MyData" component={MyData}/>
     <Stack.Screen name ="ConnectionPages" component={ConnectionPages}/>
     <Stack.Screen name="ShowCreditCards" component={ShowCreditCards}/>
     <Stack.Screen name="CreditCardView" component={CreditCardView}/>
     <Stack.Screen name="CreditCard" component={CreditCard}/>
     <Stack.Screen name="RecoveryPassword" component={RecoveryPassword}/>
     <Stack.Screen name="TransactionsView" component={TransactionsView}/>
     <Stack.Screen name= "Buy_PlayStore" component = {Buy_PlayStore}/>
     <Stack.Screen
              name="TransactionItem"
              component={TransactionItem}
              initialParams={{ item: 1}}
            />
    <Stack.Screen name = "Buy_Steam" component = {Buy_Steam}/>
    <Stack.Screen name = "Buy_PlayStation" component={Buy_PlayStation}/>
    <Stack.Screen name = "Buy" component={Buy}/>
    </Stack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const onLoad = async () => {
    try {
      var usuario = await AsyncStorage.getItem('usuario')
      setUser((JSON.parse(usuario)))

    } catch (error) {

    }

  }
  useEffect(() => {
    onLoad()
  }, [user])
  //esto elimina los warning
  console.disableYellowBox = true
  //-----------------------------
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {user !== null ?
            <StackScreenUser />
            :
            <StackScrrens />
          }
        </NavigationContainer>

      </PersistGate>

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
