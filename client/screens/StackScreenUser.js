import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserProfile from './Users/UserProfile'
import MyProducts from './Users/MyProducts'
import MyData from './MyData'
import RechargeMoney from './RechargeMoney'
import EnviarDinero from './EnviarDinero'
import ShowCreditCards from './Users/ShowCreditCards'
import CreditCardView from './CreditCardView';
import CreditCard from '../src/componentes/CreditCard';
import ContactsList from './Users/ContactsList'
import MenuUser from './MenuUser'
import stadistics from './stadistics'
import ConnectionPages from './ConnectionPages'
import TransactionsView from './Users/TransactionsView'
import TransactionItem from './Users/TransactionItem'
// import Home from './StackScrrens'
import Buy from './Buy'
import BuySteam from './BuySteam'
import Buy_PlayStore from './Buy_PlayStore'
import Buy_PlayStation from './Buy_PlayStation'

const Drawer = createDrawerNavigator();

const StackScreenUser = (props) => {

    return (
        <Drawer.Navigator 
        drawerContent={props => <MenuUser {...props} />}
        // initialRouteName="UserProfile"
        drawerStyle={{
            width: 240, 
             
          }}
        screenOptions={{
            headerShown:true,
            headerTitle:'',
            headerStyle:{
              backgroundColor:'#292768'
            },
            headerTintColor: '#BB59FA',
        
  
          }} 
           >
            <Drawer.Screen name="UserProfile" component={UserProfile} />
            <Drawer.Screen name="MyProducts" component={MyProducts} />
            <Drawer.Screen name="MyData" component={MyData} />
            <Drawer.Screen name="RechargeMoney" component={RechargeMoney} />
            <Drawer.Screen name="EnviarDinero" component={EnviarDinero} />
            <Drawer.Screen name="ShowCreditCards" component={ShowCreditCards} />
            <Drawer.Screen name="CreditCardView" component={CreditCardView} />
            <Drawer.Screen name="CreditCard" component={CreditCard} />
            <Drawer.Screen name="ContactsList" component={ContactsList} />
            <Drawer.Screen name="stadistics" component={stadistics} />
            <Drawer.Screen name="ConnectionPages" component={ConnectionPages} />
            <Drawer.Screen name="TransactionsView" component={TransactionsView} />
            <Drawer.Screen name="TransactionItem" component={TransactionItem} />
            {/* <Drawer.Screen name="Home" component={Home} /> */}
            
            <Drawer.Screen name="Buy" component={Buy} />
            <Drawer.Screen name="BuySteam" component={BuySteam} />
            <Drawer.Screen name="Buy_PlayStore" component={Buy_PlayStore} />
            <Drawer.Screen name="Buy_PlayStation" component={Buy_PlayStation} />
        </Drawer.Navigator>
    )

}
export default StackScreenUser;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
