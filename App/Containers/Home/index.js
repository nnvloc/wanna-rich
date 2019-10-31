import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, TouchableHighlight, TextInput, Form, StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import FormSchema from './validation';

import globalStyles from '../../styles';
import { insertResult } from '../../services';
import { addResult, addResultSuccess, addResultFail } from '../../actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.initialValues = { result: '', date: '', extra: '' };
  }

  addResult = async ({ result, date, extra }) => {
    const value = result.split(', ').map(v => +v);

    const res = await insertResult({ value, date, extra });
    if (!res || res.err) {
      this.props.addResultFail((res || {}).err);
      alert((res || {}).err);
    } else {
      this.props.addResultSuccess(res.data);
      alert('Add success!');
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    const { result, date, extra } = values;
    this.addResult({ result, date, extra });
    this.initialValues = { result: '', date: '', extra: '' };
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
                <Text>Enter date: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={values.date}
                  placeholder="DD/MM/YYYY"
                />
                {errors.date && touched.date ? (<Text style={styles.error}>{errors.date}</Text>) : null}
              </View>

              <View>
                <Text>Enter result: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('result')}
                  onBlur={handleBlur('result')}
                  value={values.email}
                />
                {errors.result && touched.result ? (<Text style={styles.error}>{errors.result}</Text>) : null}
              </View>

              <View>
                <Text>Enter extra number: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('extra')}
                  onBlur={handleBlur('result')}
                  value={values.extra}
                />
                {errors.extra && touched.extra ? (<Text style={styles.error}>{errors.extra}</Text>) : null}
              </View>

              <TouchableHighlight style={styles.btnSubmit} onPress={handleSubmit}><Text style={globalStyles.text}>Submit</Text></TouchableHighlight>
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
  btnSubmit: {
    marginTop: 15,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4287f5',
  }
});

const mapStateToProps = (state) => ({
  results: state.AppReducer.results,
});

const mapDispatchToProps = { addResult, addResultSuccess, addResultFail };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
