import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResetTransacctions } from '../Store/actions/transactions'
import { ResetAccount } from '../Store/actions/account'
import {logout} from '../Store/actions/user'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function MenuUser(props) {
    
    const usuario = useSelector(store => store.user)
    // console.log('MENU USER', usuario)
    const dispatch = useDispatch()
    const logHome = async () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('usuario')
        //  await  dispatch(logout())
        await dispatch(ResetAccount())
        await dispatch(ResetTransacctions())
        props.navigation.navigate('Home');
    }
    const Logout = () => {
        Alert.alert(
            'Logout', //titulo
            'Are you sure about logging out?', //Mensaje
            [{
                text: 'OK', //Arreglo de botones
                onPress: () => {
                    // user.token ? dispatch(logout(token)) : '',
                    logHome()
                },

            },
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => { props.navigation.navigate('UserProfile') },
            }
            ],
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>

                <View style={styles.userInfo}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            size={50}
                            source={ usuario.user?{ uri:usuario.user.image }:require('../screens/images/favicon.png')}


                        />
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.name}>{usuario.user?(usuario.user.name + ' ' + usuario.user.lastname): ''}</Title>
                            <Caption style={styles.alias}>@{usuario.user?usuario.user.name:''}</Caption>
                        </View>

                    </View>

                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <FontAwesome

                                name="address-card"
                                color={color}
                                size={size}
                            />
                        )}
                        label="My Account"
                        onPress={() => { props.navigation.navigate('MyData') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <FontAwesome

                                name="university"
                                color={color}
                                size={size}
                            />
                        )}
                        label="My Balance"
                        onPress={() => { props.navigation.navigate('UserProfile') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Foundation
                                name="torsos-all"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Contacts"
                        onPress={() => { props.navigation.navigate('ContactsList') }}
                    />

                </Drawer.Section>
                <Drawer.Section title="Tools">
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather

                                name="credit-card"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Cards"
                        onPress={() => { props.navigation.navigate('ShowCreditCards') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather

                                name="bar-chart-2"
                                color={color}
                                size={size}
                            />

                        )}
                        label="Stadistics"
                        onPress={() => { props.navigation.navigate('stadistics') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather

                                name="send"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Transactions"
                    onPress={() => { props.navigation.navigate('TransactionsView') }}
                    />


                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather

                                name="dollar-sign"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Recharge Money"
                        onPress={() => { props.navigation.navigate('RechargeMoney') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather

                                name="send"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Send Money"
                
                     onPress={() => { props.navigation.navigate('EnviarDinero') }}
                    />

                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Foundation
                            name='power'
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { Logout() }}

                />
            </Drawer.Section>
        </View>
    );
}

export default MenuUser;
const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    userInfo: {
        padding: 20
    },
    name: {
        fontSize: 17,
        marginTop: 3,
        fontWeight: 'bold',
    },
    alias: {
        fontSize: 14,
        lineHeight: 14
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        // borderTopColor: '#f4f4f4',
        // borderTopWidth: 1

    }

})