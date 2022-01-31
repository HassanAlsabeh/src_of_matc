import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  welcome: {
    marginTop: 10,
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
