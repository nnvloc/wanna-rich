import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import { Formik } from 'formik';
import FormSchema from './validation';

import globalStyles from '../../styles';

import { handleSummary } from '../../services';

class StatisticalPage extends Component {

  constructor(props) {
    super(props);
    this.initialValues = {
      startDate: '',
      endDate: '',
    };

    this.state = {
      startDate: '',
      endDate: '',
      summaryData: [],
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    const filteredResults = handleSummary(this.props.results, values);

    this.setState({
      summaryData: filteredResults,
    });
  }

  renderItem = ({ item }) => (
    <View style={styles.resultBlock}>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Value: </Text>
        <Text style={{ ...styles.title, ...styles.resultValue, ...styles.textBold }}>{item.value}</Text>
      </View>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Value count: </Text>
        <Text style={{...styles.resultValue, ...styles.textBold}}>{item.valueCount}</Text>
      </View>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Extra count: </Text>
        <Text style={styles.resultValue}>{item.extraCount}</Text>
      </View>
    </View>
  );

  keyExtractor = (item, index) => item.value.toString();

  render() {
    let { summaryData } = this.state;

    return (
      <View style={{ ...styles.container, flex: 1 }}>
        <View style={styles.searchBlock}>
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
                  <Text>Enter start date: </Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('startDate')}
                    onBlur={handleBlur('startDate')}
                    value={values.date}
                    placeholder="DD/MM/YYYY"
                  />
                  {errors.startDate && touched.startDate ? (<Text style={styles.error}>{errors.startDate}</Text>) : null}
                </View>

                <View>
                  <Text>Enter end date: </Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('endDate')}
                    onBlur={handleBlur('endDate')}
                    value={values.date}
                    placeholder="DD/MM/YYYY"
                  />
                  {errors.endDate && touched.endDate ? (<Text style={styles.error}>{errors.endDate}</Text>) : null}
                </View>

                <TouchableHighlight style={styles.btnSubmit} onPress={handleSubmit}><Text style={globalStyles.text}>Filter</Text></TouchableHighlight>
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.filteredResults}>
          <Text style={{ ...styles.title, ...styles.textBold }}>Results</Text>
          <FlatList
            style={{ flex: 1 }}
            renderItem={this.renderItem}
            data={summaryData}
            keyExtractor={this.keyExtractor}
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
  },
  searchBlock: {
    paddingVertical: 15,
  },
  resultBlock: {
    padding: 15,
  },
  resultDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 24,
    width: 150,
  },
  resultValue: {
    fontSize: 18,
  },
  filteredResults: {
    flex: 1,
    flexDirection: 'column',
  }
});

const mapStateToProps = (state) => {
  return {
    results: state.AppReducer.results,
  };
};

const mapDispatchToProps = {};


export default connect(mapStateToProps, null)(StatisticalPage);
