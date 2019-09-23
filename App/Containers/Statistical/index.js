import React, { Component } from 'react';
import {
  View, Text, Button, TextInput,
} from 'react-native';

export default class StatisticalPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }} />
    );
  }
}

const styles = {
  container: {
    padding: 15,
    flex: 1,
  },
  button: {
    paddingTop: 10,
    paddingBototm: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24,
  },
};
