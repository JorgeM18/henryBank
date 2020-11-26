import React from 'react'
import { StyleSheet, Dimensions, Easing} from 'react-native'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

import Home from './Home'
import CreateUser from './Users/CreateUser'
import CompleteDataUser from './Users/CompleteDataUser'
import RegisterAdress from './Users/RegisterAdress'
import InsertPin from './InsertPin'
import ForgotPassword from './ForgotPassword'
import RecoveryPassword from './RecoveryPassword'
import Login from './Login'
import Faq2 from '../src/componentes/Faq2'
import UserProfile from './StackScreenUser'



const OpenConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 250,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
const CloseConfig={
    animation:'timing',
    config:{
        duration:300,
        easing: Easing.linear

    }
}
const Stack = createStackNavigator()

const StackScreen = (props) => {
    return (
        <Stack.Navigator style={styles.container}
            screenOptions={{
                gestureEnabled: true,
                gestureDirection:'horizontal',
                headerStyle: {
                    backgroundColor: '#1f2333',
                },
                //OPCION 1 DE TRANSICION
                // ...TransitionPresets.FadeFromBottomAndroid,
               
                //OP 2
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                transitionSpec:{
                    open:OpenConfig,
                    close:CloseConfig
                },
                // headerMode='float',
                headerTintColor: '#fff',
                headerTitle: '',

            }}
            headerMode='float'
            animation='fade'>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerTitle: '',
                    headerTransparent:true,
                    headerStyle: {
                        backgroundColor: '#1f2333',
                    },
                }}
            />

            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="InsertPin" component={InsertPin} />
            <Stack.Screen name="CompleteDataUser" component={CompleteDataUser} />
            <Stack.Screen name="RegisterAdress" component={RegisterAdress} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
            <Stack.Screen name= "Faq2" component={Faq2}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{
                headerShown:false
            }} />
        </Stack.Navigator>
    )

}
export default StackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})