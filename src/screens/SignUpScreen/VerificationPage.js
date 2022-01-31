import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Button, Modal, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VerificationPage = props => {
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [verification_code, setVerificationCode] = useState('');
  console.log("toekkekekekeken",userData.token)
  const instance1 = axios.create({
    baseURL: 'https://demo.ucheed.com/matc/wp-json/ucheed-json/v1',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${userData.token}`,
    },
  });

  const verify = async () => {
    try {
        // console.log("pressed")
        const response = await   instance1
        .post('/patients/verify', {
            verification_code: verification_code ,
       
        })
    .then(res => {
        console.log("verifeireddd successs",res)
    if (res.data.status == 200) {
        alert("success");
        if (res.data.data.user_info === null) {
                props.navigation.replace('Signup2Screen');
              } else {
                props.navigation.replace('BottomNav');
              }
      
    } else if(res.data.status == 400)  {
      alert("Wrong Verification Code");
    }
  }).catch(err=> {alert("Wrong Verification code")})
  
}
  catch (error) {
    console.log(error);
    setModalText('Something went wrong.');
    showModal();
  }
};
 

//   const handleBookPress = async () => {
//     props.navigation.navigate('PaymentScreen', {
//       selectedDate: props.route.params.selectedDate,
    
//     });
//   };

  return (
    <>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../MATC-colored.png')} />
        <Text style={styles.name}>Verification Code</Text>
      </View>
      <View style={styles.container}>
       
        <TextInput
          style={{marginTop: 40}}
          value={verification_code}
          mode="outlined"
          label="verification_code"
          selectionColor={'#5bd8cc'}
          underlineColor={'#5bd8cc'}
          activeUnderlineColor={'#5bd8cc'}
          outlineColor={'#5bd8cc'}
          activeOutlineColor={'#5bd8cc'}
          onChangeText={val => setVerificationCode(val)}
          keyboardType="numeric"
          theme={{
            colors: {
              placeholder: '#cccccc',
              primary: '#5bd8cc',
            },
          }}
        />
       
        <Button
          onPress={verify}
          style={styles.button}         
          style={
             !verification_code 
              ? styles.disabledButton
              : styles.button
          }
          disabled={!verification_code }>
          <Text style={styles.buttonText}>Verify</Text>
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

export default VerificationPage;
