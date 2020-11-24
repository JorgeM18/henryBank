import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';


 
const TransactionsView = (props) => {
    const transaction = props.route.params.item
    console.log('llega', transaction)


  return(
    <View style={style.container}>
      <View style={{flex: .15}}>
            <View style={style.head}>
              <Text style={style.title}>Details</Text>
            </View>
      </View>
      <View style={style.body}>
            <Text style={style.text}>
                Transaction Number:
            </Text>
            <Text style={style.box2}>
                    {transaction && transaction.numTransaction}
            </Text>
            <Text style={style.text}>
                Description:
            </Text>
            <Text style={style.box2}>
                {transaction && transaction.description}
            </Text>
            <Text style={style.text}>
                Type:
            </Text>
            <View style={style.box}>
              <Text  style={{paddingHorizontal: 20, color:'#f6f2fc', fontFamily: 'serif'}}>
                    {transaction &&  ((transaction.movement_type === 'received') || (transaction.movement_type ==='deposits'))  ? (
                                                    <Feather
                                                            style={style.icon}
                                                            name="arrow-up-circle"
                                                            color="green"
                                                            size={25}
                                                        />) : (
                                                    <Feather
                                                            style={style.icon}
                                                            name="arrow-right-circle"
                                                            color="red"
                                                            size={25}
                                                        />
                                                        )}
               </Text>
               <Text style={{alignSelf: 'center', justifyContent:'flex-start', fontFamily:'serif', color:'#f6f2fc'}}>
                    {transaction && transaction.movement_type}
                </Text>
            </View>
            <Text style={style.text}>
                Amount:
            </Text>
            <Text style={style.box1}>
                $ {transaction && transaction.amount}
            </Text>
      </View>
      <View style={{flex: .15, backgroundColor: '#282366'}}>
        
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1f2333',
      // flexDirection: 'column',
      alignItems: 'center',
  },
  head:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7%',
    
  },
  title: {
    fontSize: 25,
    color:'#f6f2fc',
    justifyContent: 'space-between',
    alignContent:'center',
    fontFamily: 'serif'
  },
  top:{
    flexDirection: 'row',
    margin: 5,
  },
  box:{
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '3%',
    paddingBottom: '3%',
    backgroundColor: '#292768',
    color: '#f6f2fc',
    borderRadius: 7,
    width: 160,
    fontFamily: 'serif',
    flexDirection: 'row',
  },
  box2:{
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#292768',
    color: '#f6f2fc',
    borderRadius: 7,
    // width: 160,
    fontFamily: 'serif',
    flexDirection: 'row',
  },
  box1:{
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#292768',
    color: '#f6f2fc',
    borderRadius:7,
    fontSize: 24,
    fontFamily: 'serif'
    
  },
  text:{
    fontSize: 18,
    color: '#f6f2fc',
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'serif'
  },
  icon: {
    padding:'2%',
    margin: 10
  },
  iconwrapper: {
    padding: '4%',
    backgroundColor: '#f6f2fc',
    borderRadius: 50
  },
  body: {
      marginTop: '5%',
      flexDirection: 'column',
      flex: 1,
    //   justifyContent: 'flex-start',
      alignItems: 'center',
  }

})

export default TransactionsView