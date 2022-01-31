import React, {useState} from 'react';
import {Image, SafeAreaView,Switch, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Menu.style';
import * as actionTypes from '../../store/actions';

const Menu = props => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  // console.log("status",isEnabled)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <IconButton
        icon="menu"
        color={'black'}
        size={30}
        style={{alignSelf: 'flex-end'}}
        onPress={props.handleCloseMiniCart}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          margin:40
        }}>
          <View style={{display:"flex",flexDirection:"row" }}>
          <Text style={{fontSize:20}}>Normal User</Text>
           <Switch
           style={{ marginHorizontal:20,transform: [{ scaleX: 1.5 }, { scaleY: 1.3 }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          toggleSwitch();
          
          if(isEnabled == true){
          navigation.navigate('BottomNav')}
          if(isEnabled == false){
            navigation.navigate('Organizationhome')}
            props.handleCloseMiniCart();
        }} 
        value={isEnabled}
        
      />
          <Text style={{fontSize:20}}>Organization</Text></View>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
           
          }}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            navigation.navigate('OrganizationID');
          }}>
          <Text style={styles.menuItem}>Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.handleCloseMiniCart();
            // props.clearUserData();
            navigation.navigate('LoginScreen');
            logoutUser();
          }}>
          <Text style={styles.menuItem}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    store: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearUserData: userData =>
      dispatch({
        type: actionTypes.CLEAR_USER_DATA,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
