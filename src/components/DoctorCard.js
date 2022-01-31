import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, Image, Text} from 'react-native';

function DoctorCard({name, image, spec, desc, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textcontainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.spec}>{spec}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {desc}
        </Text>
      </View>
      <Image style={styles.image} source={{uri: image}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 95,
    resizeMode: 'contain',
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    opacity: 0.9,
    // opacity: 0.8,
  },
  desc: {
    fontSize: 10,
    marginBottom: 3,
    textTransform: 'capitalize',
    maxWidth: 180,
  },
  container: {
    backgroundColor: '#d8d7dd',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  spec: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  textcontainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default DoctorCard;
