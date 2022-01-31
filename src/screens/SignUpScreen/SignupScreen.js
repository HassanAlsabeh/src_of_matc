import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';
import authApi from '../../provider/api/auth';
import styles from './SignUpScreen.style';

const SignupScreen = props => {
  // const [email, setEmail] = useState('hrag.h@Hotmail.com');
  // const [first_name, setfirst_name] = useState('hrag');
  // const [last_name, setlast_name] = useState('hayrabedian');
  // const [password, setPassword] = useState('password');
  // const [c_password, setCpassword] = useState('password');

  const [email, setEmail] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setPassword] = useState('');
  // const [c_password, setCpassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
 
  const handlePress = async () => {
    if (!first_name) {
      return;
    }
    if (!last_name) {
      return;
    }
    if (!mobile) {
      return;
    }
    if (!email) {
      return;
    }
    if (!password) {
      return;
    }
    // if (c_password !== password) {
    //   setModalText('Passwords must be the same');
    //   showModal();
    //   return;
    // }
    const data = {
      token:'kYM}T(jq@*>L_gm@8alLz<*@EmS$Cv2#[VY1gl>UODvLe[HkC#/g>w}^@OCTzbJK',
      first_name:first_name,
      last_name:last_name,
      mobile:mobile,
      email:email,
      password:password,
    };

    try {
      const response = await authApi.register(data);
      console.log("resppppp",response.data)
      if (response.data.message==="success") {
        // props.storeUserData(response.data.data);
        props.navigation.replace('LoginScreen');
      } else {
        setModalText('Wrong Credetials Inputs');
        showModal(true);
      }
    } catch (error) {
      console.log(error);
      setModalText('Server error');
    }
    // props.navigation.navigate('Signup2Screen', {
    //   first_name: first_name,
    //   last_name: last_name,
    //   email: email,
    //   password: password,
    // });
  };

  return (
    <>
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../auth/MATC-colored.png')}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>SIGNUP</Text>
          <TextInput
            value={email}
            style={styles.placeholder}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={val => setEmail(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={first_name}
            style={styles.placeholder}
            placeholder="First Name"
            placeholderTextColor="black"
            onChangeText={val => setfirst_name(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={last_name}
            style={styles.placeholder}
            placeholder="Last Name"
            placeholderTextColor="black"
            onChangeText={val => setlast_name(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.placeholder}
            placeholderTextColor="black"
            onChangeText={val => setPassword(val)}
          />
          <View style={styles.line} />
          <TextInput
            value={mobile}
            secureTextEntry={true}
            style={styles.placeholder}
            placeholder="mobile"
            placeholderTextColor="black"
            onChangeText={val => setmobile(val)}
          />
          <View style={styles.line} />
          <Button onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </Button>
          <View style={styles.textContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text>{modalText}</Text>
      </Modal>
    </>
  );
};

export default SignupScreen;
