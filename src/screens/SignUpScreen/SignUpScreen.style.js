import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#5bd8cc',
    width: windowWidth * 0.8,
    height: 40,
    borderRadius: 3,
  },
  buttonText: {
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    paddingHorizontal: 40,
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
    marginTop: 10,
    color: '#000',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: windowWidth * 0.8,
    color: '#77787b',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
  },
  link: {
    color: '#5bd8cc',
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});
