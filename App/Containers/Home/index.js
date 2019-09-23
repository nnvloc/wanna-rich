import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Button, TextInput, Form, StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import FormSchema from './validation';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.initialValues = { result: '', date: '' };
  }

  addResult = (result) => {
    console.log('add result: ', result);
  }

  formValidate = (values) => {
    const errors = {};
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
    const { result, date } = values;
    global.addResult({ result, date });
    this.initialValues = { result: '', date: '' };
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
          validationSchema={FormSchema}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            handleSubmit,
          }) => (
            <View>
              <View>
                <Text>Enter result</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('result')}
                  onBlur={handleBlur('result')}
                  value={values.email}
                />
                {errors.result && touched.result ? (<Text style={styles.error}>{errors.result}</Text>) : null}
              </View>

              <View>
                <Text>Enter date</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={values.date}
                />
                {errors.date && touched.date ? (<Text style={styles.error}>{errors.date}</Text>) : null}
              </View>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
