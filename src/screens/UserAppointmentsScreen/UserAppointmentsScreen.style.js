import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  header: {
    backgroundColor: '#5bd8cc',
    width: '100%',
    height: windowHeight * 0.32,
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
    marginTop:-20,
  },
  welcome: {
    marginTop: 10,
    alignSelf: 'center',
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
});
