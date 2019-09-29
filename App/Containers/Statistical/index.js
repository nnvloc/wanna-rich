import React, { Component } from 'react';
import {
  View, Text, Button, TextInput, StyleSheet,
} from 'react-native';

import globalStyles from '../../styles';

export default class StatisticalPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ ...styles.container, flex: 1 }}>
        <View style={styles.searchBlock}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter start date"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter end date"
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
  },
  searchBlock: {
    paddingVertical: 15,
  }
});
