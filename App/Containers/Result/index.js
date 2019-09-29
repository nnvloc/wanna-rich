import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';

class ResultListPage extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => (
    <View style={styles.resultBlock}>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Date: </Text>
        <Text style={{ ...styles.title, ...styles.resultValue, ...styles.textBold }}>{item.date}</Text>
      </View>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Result: </Text>
        <Text style={styles.resultValue}>{item.value.join(', ')}</Text>
      </View>
      <View style={styles.resultDetail}>
        <Text style={styles.label}>Extra: </Text>
        <Text style={styles.resultValue}>{item.extra}</Text>
      </View>
    </View>
  );

  keyExtractor = (item, index) => item.date;

  render() {
    const { results } = this.props;
    console.log('results: ', results);
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.title, ...styles.textBold }}>Results</Text>
        <FlatList
          style={{ flex: 1 }}
          renderItem={this.renderItem}
          data={results}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 24,
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
    width: 100,
  },
  resultValue: {
    display: 'flex',
    flex: 1,
    fontSize: 24,
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.AppReducer.results,
  };
};

export default connect(mapStateToProps, null)(ResultListPage);
