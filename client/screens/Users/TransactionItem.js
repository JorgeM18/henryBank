import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';


 
const TransactionsView = (props) => {
    const transaction = props.route.params.item


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
            <Text style={style.box}>
                {transaction && transaction.numTransaction}
            </Text>
            <Text style={style.text}>
                Description:
            </Text>
            <Text style={style.box}>
                {transaction && transaction.description}
            </Text>
            <Text style={style.text}>
                Type:
            </Text>
            <Text style={style.box}>
                    {transaction && transaction.movement_type === 'received' ? (
                                                    <Feather
                                                            style={{marginLeft: '10%'}}
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
                {transaction && transaction.movement_type}
            </Text>
            <Text style={style.text}>
                amount:
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
      backgroundColor: '#1f1d5e',
      flexDirection: 'column',
      alignItems: 'center',
  },
  head:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7%'
  },
  title: {
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
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#282366',
    color: '#f6f2fc',
    borderRadius:10,
    maxWidth: '80%',
    
  },
  box1:{
    borderWidth: 1,
    borderColor: '#bb59fa',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: '#282366',
    color: '#f6f2fc',
    borderRadius:10,
    fontSize: 24
    
  },
  text:{
    fontSize: 18,
    color: '#f6f2fc',
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    paddingRight: 10,
    marginLeft: 10,
    marginHorizontal: 10
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

// const mapStateToProps = (state) => {
//   return {
//     transaction: state.transaction.transaction
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTransactionForNum: (num) => dispatch(getTransactionForNum(num)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);

export default TransactionsView