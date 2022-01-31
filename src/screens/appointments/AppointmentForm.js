import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Button, Modal, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AppointmentForm = props => {
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [document, setDocument] = useState('');
  const instance1 = axios.create({
    baseURL: 'https://demo.ucheed.com/matc/wp-json/ucheed-json/v1',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
  useEffect(() => {
    console.log("data of date and time_id",props.route.params);
  }, []);
  async function addappointment() {
    instance1
    .post('/appointments', {
      date: props.route.params.selectedDate,
      timing_id: props.route.params.timeId,
    })
    .then(res => {
    if (res.status == 200) {
      alert("Appointment Added");
    } else if (res.status == 500) {
      alert("wrong issue");
    }
  })}
  const handleDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
        ],
      });

      setDocument(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleBookPress = async () => {
    props.navigation.navigate('PaymentScreen', {
      selectedDate: props.route.params.selectedDate,
      timeId: props.route.params.timeId,
      clinicId: props.route.params.clinicId,
      weight,
      height,
      document,
    });
  };

  return (
    <>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../MATC-colored.png')} />
        <Text style={styles.name}>Appointment Form</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          value={weight}
          mode="outlined"
          label="Weight (kg)"
          selectionColor={'#5bd8cc'}
          underlineColor={'#5bd8cc'}
          activeUnderlineColor={'#5bd8cc'}
          outlineColor={'#5bd8cc'}
          activeOutlineColor={'#5bd8cc'}
          onChangeText={val => setWeight(val)}
          keyboardType="numeric"
          theme={{
            colors: {
              placeholder: '#cccccc',
              primary: '#5bd8cc',
            },
          }}
        />
        <TextInput
          style={{marginTop: 40}}
          value={height}
          mode="outlined"
          label="Height (cm)"
          selectionColor={'#5bd8cc'}
          underlineColor={'#5bd8cc'}
          activeUnderlineColor={'#5bd8cc'}
          outlineColor={'#5bd8cc'}
          activeOutlineColor={'#5bd8cc'}
          onChangeText={val => setHeight(val)}
          keyboardType="numeric"
          theme={{
            colors: {
              placeholder: '#cccccc',
              primary: '#5bd8cc',
            },
          }}
        />
        <Button onPress={handleDocumentPress} style={styles.button}>
          <Text style={styles.buttonText}>Upload Document</Text>
        </Button>
        <Text style={styles.docNameText}>{document.name}</Text>
        <Button
          onPress={()=>{addappointment();handleBookPress()}}
          style={styles.button}
          style={
            !weight || !height 
              ? styles.disabledButton
              : styles.button
          }
          disabled={!weight || !height }>
          <Text style={styles.buttonText}>Book</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight * 0.36,
    flexDirection: 'column',
  },
  logo: {
    resizeMode: 'contain',
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    padding: 10,
    marginHorizontal: 40,
  },
  button: {
    marginTop: 60,
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    borderRadius: 3,
    justifyContent: 'center',
  },
  disabledButton: {
    marginTop: 60,
    alignSelf: 'center',
    backgroundColor: '#cccccc',
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    borderRadius: 3,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
  },
  docNameText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
});

export default AppointmentForm;
