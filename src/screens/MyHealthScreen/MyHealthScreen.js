import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './MyHealthScreen.style';

const windowHeight = Dimensions.get('window').height;

const MyHealthScreen = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../MATC-colored.png')} />
        <Text style={styles.title}>MY HEALTH</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.icon_container}
          onPress={() => console.log('EMR')}>
          <Image style={styles.icon} source={require('../Icon-100.png')} />
          <Text style={styles.text}>EMR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon_container}
          onPress={() => console.log('Upload a Document')}>
          <Image
            style={[styles.icon, {height: windowHeight / 14, marginBottom: 5}]}
            source={require('../Icon-196-2.png')}
          />
          <Text style={styles.text}>UPLOAD A DOCUMENT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.icon_container}
          onPress={() => console.log('My Appointments')}>
          <Image style={styles.icon} source={require('../Icon-128.png')} />
          <Text style={styles.text}>MY APPOINTMENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon_container}
          onPress={() => console.log('Visit History')}>
          <Image
            style={[styles.icon, {height: windowHeight / 14, marginBottom: 5}]}
            source={require('../Icon-196-2.png')}
          />
          <Text style={styles.text}>VISIT HISTORY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.icon_container}
          onPress={() => console.log('Educational Materials')}>
          <Image style={styles.icon} source={require('../Icon-128.png')} />
          <Text style={styles.text}>EDUCATIONAL MATERIALS</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MyHealthScreen;
