import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button, Modal, RadioButton, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import axios from 'axios';

import styles from './PaymentScreen.style';

const PaymentScreen = props => {
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [firstName, setFirstName] = useState(
    useSelector(state => state.usr.userData.first_name),
  );
  const [lastName, setLastName] = useState(
    useSelector(state => state.usr.userData.last_name),
  );

  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paypalChecked, setPaypalChecked] = React.useState('');
  const [creditCardChecked, setCreditCardChecked] = React.useState('checked');
  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const instance = axios.create({
    baseURL: 'https://host.ucheed.com/matc/api/',
    timeout: 10000,
    headers: {
      Token: userData.token,
    },
  });

  const handleBookPress = async () => {
    try {
      const response = await instance.post(
        'appointment/book_user_appointment',
        {
          selected_date: props.route.params.selectedDate,
          doctor_address_timing_id: props.route.params.timeId,
        },
      );

      setModalText(response.data.message);
      showModal();
    } catch (error) {
      console.log(error);
      setModalText('Something went wrong.');
      showModal();
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../MATC-colored.png')} />
          <Text style={styles.name}>Payment Info</Text>
        </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.radioButtonContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="checked"
                status={paypalChecked === 'checked' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setPaypalChecked('checked');
                  setCreditCardChecked('');
                }}
              />
              <Text style={{fontSize: 20}}>PayPal</Text>
            </View>
            <Image source={require('./paypal.png')} />
          </View>
          <View style={styles.radioButtonContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="checked"
                status={
                  creditCardChecked === 'checked' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setCreditCardChecked('checked');
                  setPaypalChecked('');
                }}
              />
              <Text style={{fontSize: 20}}>Credit Card</Text>
            </View>
            <Image source={require('./creditcards.png')} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <TextInput
              style={{width: 150}}
              value={firstName}
              mode="flat"
              label="First Name"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setFirstName(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
            <TextInput
              style={{width: 150}}
              value={lastName}
              mode="flat"
              label="Last Name"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setLastName(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <TextInput
              value={creditCardNumber}
              mode="flat"
              label="Card Number"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setCreditCardNumber(val)}
              keyboardType="numeric"
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <TextInput
              style={{width: 150}}
              value={cvv}
              mode="flat"
              label="CVV"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setCvv(val)}
              keyboardType="numeric"
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
            <TextInput
              style={{width: 150}}
              value={expirationDate}
              mode="flat"
              label="Expiration Date"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setExpirationDate(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <TextInput
              style={{width: 150}}
              value={country}
              mode="flat"
              label="Country"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setCountry(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
            <TextInput
              style={{width: 150}}
              value={city}
              mode="flat"
              label="City"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setCity(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <TextInput
              value={address}
              mode="flat"
              label="Address"
              selectionColor={'#5bd8cc'}
              underlineColor={'#5bd8cc'}
              activeUnderlineColor={'#5bd8cc'}
              outlineColor={'#5bd8cc'}
              activeOutlineColor={'#5bd8cc'}
              onChangeText={val => setAddress(val)}
              theme={{
                colors: {
                  background: '#fff',
                  placeholder: '#cccccc',
                  primary: '#5bd8cc',
                },
              }}
            />
          </View>
          <View>
            <Text style={styles.totalText}>Total: $20.00</Text>
          </View>
          <View style={{marginBottom: 40}}>
            <Button
              onPress={handleBookPress}
              style={styles.button}
              style={
                !firstName ||
                !lastName ||
                !creditCardNumber ||
                !cvv ||
                !expirationDate ||
                !country ||
                !city ||
                !address
                  ? styles.disabledButton
                  : styles.button
              }
              disabled={
                !firstName ||
                !lastName ||
                !creditCardNumber ||
                !cvv ||
                !expirationDate ||
                !country ||
                !city ||
                !address
              }>
              <Text style={styles.buttonText}>Submit Payment</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}>
        <Text>{modalText}</Text>
      </Modal>
    </>
  );
};

export default PaymentScreen;
