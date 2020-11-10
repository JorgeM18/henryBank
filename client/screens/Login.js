import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PassMeter from 'react-native-passmeter'

const MAX_LEN = 15;
const MIN_LEN = 6;
const PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];


export default class Login extends React.Component {
   constructor(props){ 
    super(props);
    this.state={
      email:"",
      password:""
}
}
    render(){
    return(
        <View style = {styles.container}>
            
            <Image source={require('./images/Logo-05.png')} style= {styles.logo}/>
        <View style = {styles.inputView}>
            {/* <Text> Open up App.js to start working on ypur app!!</Text> */}
            <TextInput
            style={styles.inputText}
            placeholder = "Email..."
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => this.setState({email:text})}/>
            </View>
            {/* <View style = {styles.inputView}> 
            <TextInput 
            secureTextEntry
            style={styles.inputText}
            placeholder = "Password..."
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => this.setState({password:text})}/>
            </View> */}
            <SafeAreaView style = {styles.inputView}> 
            <TextInput 
            secureTextEntry
            style={styles.inputViewSafe}
            maxLength={15}
            placeholder = "Password..."
            placeholderTextColor = "#3B8EA5"
            onChangeText = {text => this.setState({password:text})}/>
          
            <PassMeter
            showLabels
            password={this.state.password}
            maxLength={MAX_LEN}
            minLength={MIN_LEN}
            labels={PASS_LABELS}
            />
              </SafeAreaView>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginTextBtn}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
 }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#181c23',
        alignItems: 'center',
        justifyContent: 'center'
    },

 logo:{
   width: 150,
   height: 200,  
    marginBottom: 40
},

 inputView:{
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
},

  inputViewSafe:{
    margin: 5,
    padding: 6,
    borderRadius:8,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#eceff1"
},

 inputText:{
    height: 50,
    color: "white"
},

 forgot:{
    color: "white",
    height: 20,
    marginTop: 5
},

 loginBtn:{
     width: "80%",
     backgroundColor: "#f19953",
     borderRadius: 25,
     height: 50,
     alignItems: "center",
     marginTop: 40,
     marginBottom: 10

 },
 loginText:{
     color: "white", 
 },

 loginTextBtn:{
    color: "white",
    marginTop: 15 
}
})

