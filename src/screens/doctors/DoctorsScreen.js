import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import DoctorCard from '../../components/DoctorCard';

import useApi from '../../provider/api/useApi';
import doctorsApi from '../../provider/api/doctors';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {Card, Paragraph} from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DoctorsScreen(props) {
  const [userAppointments, setUserAppointments] = useState([]);
  const navigation = useNavigation();
  const [userData] = useState(useSelector(state => state.usr.userData));
  // const {data: doctors, request: getDoctors} = useApi(doctorsApi.getallDoctors);
  console.log("token",userData.token)
  // useEffect(() => {
  //   console.log(props.route.params);
  //   getDoctors();
  // }, []);
  const instance = axios.create({
    baseURL: 'https://demo.ucheed.com/matc/wp-json/ucheed-json/v1',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get('/doctors');
        // console.log('Doctor List response', response.data.data);

        const userAppointmentsViews =
          response.data.data &&
          response.data.data.map((item, idx) => {
          
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DoctorDetails', {
                        doctorID: item.id,
                      })
                    }
                    key={idx}
                    style={{
                      backgroundColor: '#cacccc',
                      marginTop: 10,
                      marginBottom: 10,
                      padding: 10,
                      margin: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Paragraph style={{fontSize: 12}}>
                          {item&& item.first_name}{""}{item&& item.last_name}
                        </Paragraph>
                        <Paragraph style={{fontSize: 18}}>
                        {item.about}
                        </Paragraph>
                     
                      </View>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: `${item.image_url}`,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
             
            // const date = new Date(appointmentDay.date);
            // console.log('datttettetete', appointmentDay.appointments[0]);

          
          });
  // return (
            //   <View key={idx} style={{margin: 10}}>
            //     <Text
            //       style={{fontSize: 20, marginLeft: '5%', fontWeight: 'bold'}}>
            //       {appointmentDay.date}
            //       {/* {appointmentDay.date.substring(
            //         0,
            //         appointmentDay.date.length - 6,
            //       )} */}
            //     </Text>
            //     <Card.Content>{appointmentList}</Card.Content>
            //   </View>
            // );
        setUserAppointments(userAppointmentsViews);
        // setSpinner(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [userData]);

  const handlePressDoctor = item => {
    navigation.navigate('DoctorDetails', {
      id: item.id,
      name: item.firstname + ' ' + item.lastname,
      image: item.image,
      desc: item.about,
      spec: item.specialities,
    });
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar
          platform="android"
          lightTheme={true}
          placeholder="Search by Doctor"
          containerStyle={styles.searchbar}
          leftIconContainerStyle={{left: windowWidth * 0.75}}
        />
        <Text style={styles.title}>Search by Speciality</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.icon_container}>
            <Image style={styles.icon} source={require('./icon1.png')} />
            <Text style={styles.text}>INTERNAL MEDICINE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon_container}>
            <Image style={styles.icon} source={require('./icon2.png')} />
            <Text style={styles.text}> HEART HEALTH</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.icon_container}>
            <Image style={styles.icon} source={require('./icon4.png')} />
            <Text style={styles.text}>GENERAL MEDICINE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon_container}>
            <Image style={styles.icon} source={require('./icon3.png')} />
            <Text style={styles.text}> VACCINE </Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <ScrollView style={styles.doctorsContainer}>{userAppointments}</ScrollView>
      {/* <View style={styles.doctorsContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.title}>Book a Doctor</Text>}
          data={doctors.data}
          keyExtractor={listing => listing.id.toString()}
          renderItem={({item}) => (
            <DoctorCard
              name={item.firstname + ' ' + item.lastname}
              image={item.image}
              desc={item.about}
              spec={item.specialities}
              onPress={() => {
                handlePressDoctor(item);
              }}
            />
          )}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  doctorsContainer: {
    width: '100%',
    backgroundColor: '#5bd8cc',
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#f0f2f2',
    borderBottomWidth: 8,
    borderBottomColor: '#dddddd',
    padding: 20,
    flex: 0.5,
  },
  image: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginBottom:-5,
    // borderTopRightRadius: 200,
    // borderTopLeftRadius: 200,
  },
  searchbar: {
    height: windowHeight * 0.07,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5bd8cc',
    marginBottom: 10,
    // padding: -50,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  row: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  icon: {
    padding: 10,
    width: windowWidth / 6,
    height: windowHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  icon_container: {
    flexDirection: 'row',
    width: windowWidth / 2.5,
    height: windowHeight / 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width: windowWidth * 0.9,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: windowWidth * 0.8,
    color: '#cccccc',
  },
});
