/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {Firebase} from './src/config/firebase'
import RootScreen from './src/config/navigation'
export default class App extends Component{
  render() {
    return (
      <RootScreen/>
    );
  }
}
