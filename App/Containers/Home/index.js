import React, { Component } from 'react';
import { View, Text, Button, TextInput } from "react-native";
import { Formik } from 'formik';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.initialValues = { result: '', date: '' };
  }

  addResult = (result) => {
    console.log('add result: ', result);
  }

  formValidate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  onSubmit = (values, { setSubmitting }) => {
    console.log('the value: ', value);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Formik initialValues={this.initialValues} onSubmit={this.onSubmit}>
          {props => (
            <View>
              <Text>Enter result</Text>
              <TextInput
                onChangeText={props.handleChange('result')}
                onBlur={props.handleBlur('result')}
                value={props.values.email}
              />
              <Text>Enter date</Text>
              <TextInput
                onChangeText={props.handleChange('date')}
                onBlur={props.handleBlur('date')}
                value={props.values.date}
              />
              <Button onPress={props.handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default HomePage;
