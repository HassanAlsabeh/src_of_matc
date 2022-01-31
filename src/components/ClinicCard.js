import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text} from 'react-native';

function ClinicCard(props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderColor: props.isSelected ? '#5bd8cc' : '#cccccc'},
      ]}
      onPress={props.onPress}>
      <Text style={styles.name}>{props.title}</Text>
      <Text style={styles.text}>Location: {props.address1}</Text>
      <Text style={styles.text}>Number: {props.mobile}</Text>
      <Text style={styles.text}>Email: {props.email}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
});

export default ClinicCard;
