import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-native-infinite-scrolling'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from "react-redux";
import {getTransactions} from './../../Store/actions/transactions'

 
const TransactionsView = ( props) => {
  const [data, setData] = useState([])
  const [user, setUser] = useState('')

  const onLoad = async () => {
    try {
        var usuario = await AsyncStorage.getItem('usuario')
        setUser((JSON.parse(usuario)))
        user === '' ? '' : console.log('user',user)

    } catch (error) {
        console.log(error)


    }

}

  useEffect(() => {
    loadMore()
    onLoad()
    user === '' ? '' : props.getTransactions(user.data.id)
   
  
  },[])

  const handleItem = (item) => {
    const itemSend = props.transactions[item-1]
    props.navigation.navigate('TransactionItem', { item: itemSend})
  }

  const Loadtransaction = []
 
  const renderData = ({ item }) => {
    return(
      <View style={style.top}>
       
        <View style={style.box}>
              <TouchableOpacity style={style.iconwrapper} onPress={() => handleItem(item.numTransaction)} >
                          {item.movement_type === 'received' ? (
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
              </TouchableOpacity>
                      {item.description && (item.description.length > 15 ) ? (
                        <Text style={[style.text, { justifyContent: 'flex-start'} ]}> {item.description.substring(0,15) + ' ... '} </Text>
                      ):(
                        <Text style={[style.text, {justifyContent: 'flex-start'} ]}> {item.description +'          '}  </Text>
                      )}
                  
                    {item.movement_type === 'received' ? (
                    <Text style={[style.text, {fontWeight: 'bold'}]}>  {item.amount} </Text>) :
                    (<Text style={[style.text, {fontWeight: 'bold'}]}> - {item.amount} </Text>)}
            </View>

     </View>
    )
  }
 
  const loadMore = () => {
   
      let updatedData = props.transactions && props.transactions.concat(Loadtransaction)
      setData(updatedData)
    
  }

  return(
    <View style={style.container}>
      <View style={{flex: .85}}>
            <View style={style.head}>
              <Text style={style.title}>My Transactions</Text>
            </View>
            <View>
              <Text>{user ? user.data.id : 'nada'}</Text>
            </View>
          <InfiniteScroll 
            renderData = {renderData}
            data = { props.transactions && props.transactions }
            loadMore = { loadMore }
          />
      </View>
      <View style={{flex: .15, backgroundColor: '#282366'}}>
        
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1f1d5e',
      flexDirection: 'column'
  },
  head:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7%'
  },
  title: {
    // fontFamily: 'arial',
    fontSize: 25,
    color:'#f6f2fc',
    justifyContent: 'space-between',
    alignContent:'center',
  },
  top:{
    flexDirection: 'row',
    margin: 12,
  },
  box:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    paddingLeft: '5%',
    paddingRight:'5%',
    backgroundColor: '#282366',
    width: '100%', 
    borderRadius:10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text:{
    // fontFamily:'Cochin',
    fontSize: 16,
    marginLeft: '10%',
    color: '#f6f2fc',
  },
  icon: {
    padding: 2,
  },
  iconwrapper: {
    padding: '4%',
    backgroundColor: '#f6f2fc',
    borderRadius: 50
  }

})

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction.transactions,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (id) => dispatch(getTransactions(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);