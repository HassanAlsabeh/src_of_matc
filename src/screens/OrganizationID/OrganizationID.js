import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Menu from '../Menu/Menu';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
export default function OrganizationID() {
  const [showMenu, setShowMenu] = useState(false);
  const [userData] = useState(useSelector(state => state.usr.userData));
  // console.log("ussssssssseeerrr",userData)
  return (
    <>
      <View style={{display: showMenu ? 'flex' : 'none'}}>
        <Menu
          handleCloseMiniCart={() => setShowMenu(false)}
          visible={showMenu}></Menu>
      </View>
      <IconButton
        icon="menu"
        color={'black'}
        size={25}
        style={{alignSelf: 'flex-end'}}
        onPress={() => setShowMenu(true)}
      />
      <View style={{alignItems: 'center', marginTop: '80%'}}>
        <Text style={{fontSize: 20, marginBottom: 20}}>Your Code :</Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            backgroundColor: '#5bd8cc',
          }}>
         {userData.join_organization_code}
        </Text>
      </View>
    </>
  );
}
