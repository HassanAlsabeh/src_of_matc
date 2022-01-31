import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';

function TimeItem({hour, onPress, checked}) {
  return (
    <TouchableOpacity
      style={checked == false ? styles.container : styles.checked}
      onPress={onPress}>
      <Text>{hour}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5bd8cc',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  checked: {
    backgroundColor: '#5bd8cc',
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5bd8cc',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  hour: {
    fontSize: 30,
    color: 'black',
  },
});

export default TimeItem;
