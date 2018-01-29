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
    const {navigate} = this.props.navigation
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
            Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(()=>{
                Alert.alert('Dang nhap thanh cong')
                navigate('home')
            })
            .catch(function(error) {
                Alert.alert('Sai tên tài khoảng hoặc mật khẩu')
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{
            navigate('register')
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Đăng kí</Text>
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
  button:{
    width:width*167.5/187.5,
    height:width*22.5/187.5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green',
    marginTop:width*10/187.5
  },
  buttonText:{
    color:'#fff'
  }
});
