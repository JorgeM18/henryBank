import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/store';
import StackScrrens from './screens/StackScrrens';
import StackScreenUser from './screens/StackScreenUser';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
