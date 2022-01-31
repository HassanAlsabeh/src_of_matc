import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import CountryCodePicker from '../../global/elements/countries/CountryCodePicker';
import axios from 'axios';

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import authApi from '../../provider/api/auth';
import * as actionTypes from '../../store/actions';

const Signup2Screen = ({navigation}) => {
  const route = useRoute();
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [date, setDate] = useState(new Date());
  const [country, setcountry] = useState('');
  const [height, setheight] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [countryCode, setCountryCode] = useState('961');
  const [modalText, setModalText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [gender, setGender] = useState('M');
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmitPress = async () => {
    if (!gender) {
      return;
    }
    if (!country) {
      return;
    }
    if (!height) {
      return;
    }

    setSpinner(true);
    const dob = date.toISOString().substring(0, 10);

    // const data = {
    //   first_name: route.params.first_name,
    //   last_name: route.params.last_name,
    //   // email: route.params.email,
    //   // date_of_birth: dob,
    //   // password: route.params.password,
    //   // mobile_country_number: countryCode + country,
    //   gender: gender,
    //   country: 'london',
    //   // currency_id: '1',
    //   // language_id: '1',
    //   // city_id: '1',
    //   // address: 'main road',
    //   // blood_group: 'A+',
    //   // weight: '90',
    //   height: '170',
    // };
    const instance1 = axios.create({
      baseURL: 'https://demo.ucheed.com/matc/wp-json/ucheed-json/v1/',
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    instance1
      .put('patients/self', {
       
          gender: gender,
          height: height,
          country: country,
      
      })
      .then(response => {
        setSpinner(false);
        console.log('console', response.status);
        if (response.status == 200) {
          navigation.replace('BottomNav');
        } else {
          setSpinner(false);
          navigation.replace('Signup2Screen');
        }
      });
    // try {
    //   const response = await authApi.signup(data);
    //   console.log("response signup page",response.data)

    //   if (response.data.status !== 'failed') {
    //     setSpinner(false);
    //     data.token = response.data.data.token;
    //     props.storeUserData(data);
    //     props.navigation.replace('BottomNav');
    //   } else {
    //     setModalText(response.data.message);
    //     setSpinner(false);
    //     showModal();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setModalText('An error occured');
    //   showModal();
    // }
  };

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Signing up...'}
        color={'#5bd8cc'}
        overlayColor={'#fff'}
        animation={'fade'}
      />
      <ScrollView keyboardDismissMode="interactive" nestedScrollEnabled={true}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('./MATC-colored.png')} />
        </View>
        <View style={styles.container}>
          <DropDownPicker
            open={pickerOpen}
            value={gender}
            items={items}
            setOpen={setPickerOpen}
            setValue={setGender}
            setItems={setItems}
            style={{
              marginVertical: 10,
              backgroundColor: 'transparent',
              border: 'none',
            }}
            listMode="SCROLLVIEW"
          />
          <View style={styles.line} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button
              icon="calendar-month"
              uppercase={false}
              color="black"
              mode="text"
              style={styles.dob}
              onPress={() => setShowDatePicker(true)}>
              Date of birth
            </Button>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={{marginTop: 10}}>
                {date.toISOString().substring(0, 10)}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
          <View style={styles.line} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{marginTop: 10}}>
              {/* <CountryCodePicker
                direction={'ltr'}
                selectedCountry={'lb'}
                onCountrySelected={country => {
                  setCountryCode(country.dialCode);
                }}
              /> */}
            </View>
            <View>
              <TextInput
                value={country}
                // keyboardType="numeric"
                style={styles.placeholder}
                placeholder="Country"
                placeholderTextColor="black"
                onChangeText={val => setcountry(val)}
              />

              <TextInput
                value={height}
                keyboardType="numeric"
                style={styles.placeholder}
                placeholder="Height in m"
                placeholderTextColor="black"
                onChangeText={val => setheight(val)}
              />
            </View>
          </View>
          <View style={styles.line} />
          <Button onPress={handleSubmitPress} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT ACCOUNT</Text>
          </Button>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text>{modalText}</Text>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.8,
    height: 45,
    borderRadius: 3,
  },
  buttonText: {
    color: 'black',
  },
  dob: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.05,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    paddingHorizontal: 40,
    color: '#000',
  },
  datepicker: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexDirection: 'row',
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight / 3,
  },
  logo: {
    resizeMode: 'contain',
    width: windowWidth * 0.7,
    height: windowHeight / 3,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 30,
    color: 'black',
  },
  placeholder: {
    // marginTop: 10,
    color: '#000',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: windowWidth * 0.8,
    color: '#77787b',
  },
  picker: {
    height: 25,
    width: windowWidth * 0.8,
    marginVertical: 10,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: userData =>
      dispatch({
        type: actionTypes.STORE_USER_DATA,
        userData,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup2Screen);
