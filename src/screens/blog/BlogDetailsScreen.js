import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Card, Button, Icon} from 'react-native-elements';
import Menu from '../Menu/Menu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const users = [
  {
    name: 'brynn',
    text:'  The idea wonen structure than actual designThe idea with React Native Elements is more about componen structure than actual designThe idea with React Native Elements is more about componen structure than actual design',
    avatar:
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    name: 'thot leader',
    text:'  The idea with React Native Elements is more about componen structure than actual design',
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  },
  {
    name: 'jsa',
    text:'  The idea with React Native Elements is more about componen structure than actual design',
    avatar:
      'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
  },
  {
    name: 'talhaconcepts',
    text:'  The idea with React Native Elements is more about componen structure than actual design',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'andy vitale',
    text:'  The idea with React Native Elements is more about componen structure than actual design',
    avatar:
      'https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg',
  },
  {
    name: 'katy friedson',
    text:'  The idea with React Native Elements is more about componen structure than actual design',
    avatar:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
  },
];
export default function BlogDetailsScreen() {
  const navigation = useNavigation();
  const [userData] = useState(useSelector(state => state.usr.userData));
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <StatusBar hidden={true} />
      <View style={{display: showMenu ? 'flex' : 'none'}}>
        <Menu
          handleCloseMiniCart={() => setShowMenu(false)}
          visible={showMenu}></Menu>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="menu"
            color={'black'}
            size={25}
            style={{alignSelf: 'flex-end'}}
            onPress={() => setShowMenu(true)}
          />
          <Text style={styles.name}>BLOG</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 30,
              backgroundColor: '#CED1CB',
              padding: 12,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity>
              <Text>one</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>two</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>three</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>four</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>five</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>six</Text>
            </TouchableOpacity>
            <Text>{'|'}</Text>
            <TouchableOpacity>
              <Text>seven</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: '78%', marginTop: '-20%'}}>
          <View>
            {/* <Card> */}

            {/* <Card.Divider /> */}
            {/* {users.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={styles.name}>{u.name}</Text>
                </View>
              );
            })} */}
            {/* </Card> */}
            {/* <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>FONTS</Card.Title>
            <Card.Divider />
            
            <Text style={styles.fonts}>Normal Text</Text>
          </Card> */}
            {users.map((u, i) => {
              return (
                  <View style={{marginHorizontal:30}}>
                <Card  >
                    <View style={{height:300,borderColor:"#5bd8cc",borderWidth:2,margin:-17,padding:18}}> 
                    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:20}}>
                  <Card.Title style={{marginTop:20 , fontSize:20}}>{u.name}</Card.Title>
                  <Card.Image style={{padding: 20,height:90,width:90}} source={{uri: u.avatar}}/>
                  </View>
                  <Text style={{marginBottom: 10}}>
                  {u.text}
                  </Text>
                  </View>
                  
                </Card>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight * 0.36,
    flexDirection: 'column',
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  logo: {
    resizeMode: 'contain',
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    alignSelf: 'center',
  },
  name: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  welcome: {
    marginTop: 5,
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  icon: {
    padding: 10,
    width: windowWidth / 4.5,
    height: windowHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  icon_container: {
    width: windowWidth / 3,
    height: windowHeight / 6,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
});
