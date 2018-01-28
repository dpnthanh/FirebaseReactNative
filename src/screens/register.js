/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Firebase} from '../config/firebase'
export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      pass:''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='nhap email'
          onChangeText={(value)=>{this.setState({email:value})}}
        />
        <TextInput
          style={styles.input}
          placeholder='nhap password'
          secureTextEntry={true}
          onChangeText={(value)=>{this.setState({pass:value})}}
        />
        <TouchableOpacity 
          onPress={()=>{
            Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(()=>{
                Alert.alert('Dang ki thanh cong')
            })
            .catch(function(error) {
                Alert.alert('Dang ki that bai')
            });
          }}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>Dang Ki</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input:{
    width: width*167.5/187.5
  },
  loginButton:{
    width:width*167.5/187.5,
    height:width*22.5/187.5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'blue',
    marginTop:width*10/187.5
  },
  buttonText:{
    color:'#fff'
  }
});
