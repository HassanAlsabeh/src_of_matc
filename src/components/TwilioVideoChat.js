/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useRef, useEffect, useContext} from 'react';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import MovableView from 'react-native-movable-view';
import DocumentPicker from 'react-native-document-picker';

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Text,
  Pressable,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions,
  FlatList,
  LogBox,
} from 'react-native';
import axios from 'axios';
//  import {API_URL} from 'react-native-dotenv';
import {
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const Stack = createStackNavigator();
const initialState = {
  isAudioEnabled: true,
  isVideoEnabled: true,
  status: 'disconnected',
  participants: new Map(),
  videoTracks: new Map(),
  userName: '',
  roomName: '',
  token: '',
};

const AppContext = React.createContext(initialState);

const dimensions = Dimensions.get('window');

const TwilioVideoChat = ({route}) => {
  LogBox.ignoreAllLogs();
  const [props, setProps] = useState(initialState);
  const IDs = route.params;
  console.log('patteiinnttt IIdd', IDs);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContext.Provider value={{props, setProps}}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={props => <HomeScreen IDs={route.params} {...props} />}
          />
          <Stack.Screen
            name="Video Call"
            component={VideoCallScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </AppContext.Provider>
    </>
  );
};

const HomeScreen = ({IDs, navigation}) => {
  const [chatUser] = useState({
    name: 'Robert Henry',
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    {sender: 'John Doe', message: 'Hey there!', time: '6:01 PM'},
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="angle-left"
              type="font-awesome"
              size={30}
              color="#111"
            />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{uri: chatUser.profile_image}}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#111', fontWeight: '700', fontSize: 18}}>
              {IDs.doctorfullname}
            </Text>
            <Text style={{color: '#111', fontWeight: '300'}}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              _checkPermissions(() => {
                // navigation.navigate('Video Call');

                axios
                  .get(
                    `https://demo.ucheed.com/matc/twilio/matc_twilio.php/?roomName=${IDs.appointmentId}&identity=${userData.first_name}`,
                  )
                  .then(function (response) {
                    console.log('resssssssssssss', response.data);
                    if (response) {
                      setProps({...props, token: response.data});
                      navigation.navigate('Video Call', {
                        doctorID: IDs.doctorfullname,
                      });
                      console.log('iddddddddddddd', IDs.doctorfullname);
                      return true;
                    } else {
                      response.text().then(error => {
                        Alert.alert(error);
                      });
                    }
                  })
                  .catch(error => {
                    console.log('error', error);
                    Alert.alert('API not available');
                  });
              });
            }}>
            <Text>
              <Icon
                name="videocam"
                type="Feather"
                color="#111"
                size={30}
                marginHorizontal={15}
                padding={10}
                borderRadius={40}
              />{' '}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const {props, setProps} = useContext(AppContext);
  const [userData] = useState(useSelector(state => state.usr.userData));
  // console.log('dataaatatataa:', IDs);
  const _checkPermissions = callback => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    checkMultiple(
      Platform.OS === 'ios' ? iosPermissions : androidPermissions,
    ).then(statuses => {
      const [CAMERA, AUDIO] =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (
        statuses[CAMERA] === RESULTS.UNAVAILABLE ||
        statuses[AUDIO] === RESULTS.UNAVAILABLE
      ) {
        Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      } else if (
        statuses[CAMERA] === RESULTS.BLOCKED ||
        statuses[AUDIO] === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Error',
          'Permission to access hardware was blocked, please grant manually',
        );
      } else {
        if (
          statuses[CAMERA] === RESULTS.DENIED &&
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          requestMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
          ).then(newStatuses => {
            if (
              newStatuses[CAMERA] === RESULTS.GRANTED &&
              newStatuses[AUDIO] === RESULTS.GRANTED
            ) {
              callback && callback();
            } else {
              Alert.alert('Error', 'One of the permissions was not granted');
            }
          });
        } else if (
          statuses[CAMERA] === RESULTS.DENIED ||
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
            result => {
              if (result === RESULTS.GRANTED) {
                callback && callback();
              } else {
                Alert.alert('Error', 'Permission not granted');
              }
            },
          );
        } else if (
          statuses[CAMERA] === RESULTS.GRANTED ||
          statuses[AUDIO] === RESULTS.GRANTED
        ) {
          callback && callback();
        }
      }
    });
  };
  const [document, setDocument] = useState('');
  console.log('documenttttt', document);
  const handleDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
        ],
      });

      setInputMessage(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const renderChatFooter = () => {
    if (document) {
      return (
        <View>
          <Text>Image loaded:</Text>
          <Image
            source={{ uri: document }}
            style={{ height: 75, width: 75 }}
          />
        </View>
      );
    }
    return null;
  };
  useEffect(() => {
    _checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.container}>

    <View style={styles.form}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <FlatList
            style={{backgroundColor: '#f2f2ff'}}
            inverted={true}
            data={JSON.parse(JSON.stringify(messages)).reverse()}
            renderItem={({item}) => (
              <TouchableWithoutFeedback>
                <View style={{marginTop: 6}}>
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor: '#3a6ee8',
                      alignSelf:
                        item.sender === currentUser.name
                          ? 'flex-end'
                          : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 8,
                      borderBottomLeftRadius:
                        item.sender === currentUser.name ? 8 : 0,
                      borderBottomRightRadius:
                        item.sender === currentUser.name ? 0 : 8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                      }}>
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        color: '#dfe4ea',
                        fontSize: 14,
                        alignSelf: 'flex-end',
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />

          <View style={{paddingVertical: 10}}>
            <View style={styles.messageInputView}>
              <TouchableOpacity onPress={handleDocumentPress}>
                <Icon name="attachment" type="material" size={30} margin={2} />
              </TouchableOpacity>
              <TextInput
                defaultValue={inputMessage}
                style={styles.messageInput}
                placeholder="Message"
                onChangeText={text => setInputMessage(text)}
                onSubmitEditing={() => {
                  sendMessage();
                }}
              />
              <TouchableOpacity
                style={styles.messageSendView}
                onPress={() => {
                  sendMessage();
                  renderChatFooter()
                }}>
                <Icon name="send" type="material" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <View style={styles.formGroup}>
            <Text style={styles.text}>User Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              value={props.userName}
              onChangeText={text => setProps({...props, userName: text})}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.text}>Room Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              value={props.roomName}
              onChangeText={text => setProps({...props, roomName: text})}
            />
          </View> */}
    </View>
    // </KeyboardAvoidingView>
  );
};

const VideoCallScreen = ({route, navigation}) => {
  const DrID = route.params;
  // console.log("doctorIDDDD",DrID);
  const twilioVideo = useRef(null);
  // const [flip,setFlip]= useState(false);
  const {props, setProps} = useContext(AppContext);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter(counter => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  useEffect(() => {
    twilioVideo.current.connect({
      roomName: props.roomName,
      accessToken: props.token,
    });
    setProps({...props, status: 'connecting'});
    return () => {
      _onEndButtonPress();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
    setProps(initialState);
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!props.isAudioEnabled)
      .then(isEnabled => setProps({...props, isAudioEnabled: isEnabled}));
  };

  const _onVideoStopButtonPress = () => {
    twilioVideo.current
      .setLocalVideoEnabled(!props.isVideoEnabled)
      .then(isEnabled => setProps({...props, isVideoEnabled: isEnabled}));
  };
  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  return (
    <View style={styles.callContainer}>
      {/* <ImageBackground
        blurRadius={2.2}
        source={{
          uri: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=626&ext=jpg',
        }}
        style={
          props.status === 'connected'
            ? {width: '100%', height: 0}
            : {flex: 1, width: '100%', height: 750}
        }>
        <LinearGradient
          colors={['transparent', '#174553', '#174553']}
          style={styles.linearGradient}></LinearGradient>
      </ImageBackground> */}

      <TouchableOpacity
        style={{position: 'absolute', left: '0%', top: '3%', zIndex: 1}}
        onPress={() => {
          twilioVideo.current.disconnect();
          setProps(initialState);
          // setProps(initialState);
        }}>
        <Icon
          name="arrow-back"
          type="FontAwsome"
          color="#111"
          size={30}
          width={60}
          // zIndex={2}
        />
      </TouchableOpacity>

      {(props.status === 'connected' || props.status === 'connecting') && (
        <View style={styles.callWrapper}>
          {/* <View>
            <Text style={{}}>
              hello
            </Text>
            </View> */}
          {props.status === 'connected' && (
            <View style={styles.remoteGrid}>
              {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => (
                <TwilioVideoParticipantView
                  style={styles.remoteVideo}
                  key={trackSid}
                  trackIdentifier={trackIdentifier}
                />
              ))}
            </View>
          )}
        </View>
      )}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={_onFlipButtonPress}>
          <Icon
            style={{marginTop: 20}}
            name="camera-reverse"
            type="ionicon"
            color="#111"
            size={30}
            padding={20}
            backgroundColor="#EDEEF0"
            borderRadius={40}
          />
        </TouchableOpacity>

        <Pressable onPress={_onVideoStopButtonPress}>
          <Text style={{marginTop: 20}}>
            {props.isVideoEnabled ? (
              <Icon
                name="videocam"
                type="Feather"
                color="#111"
                size={30}
                padding={20}
                backgroundColor="#EDEEF0"
                borderRadius={40}
              />
            ) : (
              <Icon
                name="videocam-off"
                type="Feather"
                color="#111"
                size={30}
                padding={20}
                backgroundColor="#C8CADC"
                borderRadius={40}
              />
            )}
          </Text>
        </Pressable>
        <Pressable onPress={_onMuteButtonPress}>
          <Text style={{marginTop: 20}}>
            {props.isAudioEnabled ? (
              <Icon
                name="mic"
                type="Feather"
                color="#111"
                size={30}
                padding={20}
                backgroundColor="#EDEEF0"
                borderRadius={40}
              />
            ) : (
              <Icon
                name="mic-off"
                type="Feather"
                color="#111"
                size={30}
                padding={20}
                backgroundColor="#C8CADC"
                borderRadius={40}
              />
            )}
          </Text>
        </Pressable>
        <TouchableOpacity onPress={_onEndButtonPress} style={{marginTop: 20}}>
          <Icon
            name="call-end"
            type="MaterialIcons"
            color="#EDEEF0"
            size={30}
            padding={20}
            backgroundColor="#E94310"
            borderRadius={40}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.doctortext}>{DrID.doctorID}</Text>
        <View
          style={{display: 'flex', flexDirection: 'row', marginLeft: '25%'}}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '25%'}}>
            <Text style={{color: 'white', fontSize: 15}}>
              {minute}
              {':'}
              {second}
            </Text>
          </View>

          {/* <TouchableOpacity onPress={() => setIsActive(!isActive)}>
            <Text>{isActive ? "Pause": "Start"}</Text>
          
        </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setSecond('00');
              setMinute('00');
              setIsActive(false);
              setCounter('');
            }}></TouchableOpacity>
        </View>
      </View>
      <MovableView>
        <View>
          {/* <TouchableOpacity
            style={{position: 'absolute', bottom: 140, right: 38 ,}} onPress={_onFlipButtonPress}>
            <Icon
              name="rotate-right"
              type="FontAwesome"
              color="#111"
              size={18}
              padding={8}
              backgroundColor="#EDEEF0"
              borderRadius={40}
              zIndex={1}
            />
          </TouchableOpacity> */}
          <TwilioVideoLocalView
            enabled={props.status === 'connected'}
            style={styles.localVideo}
          />
        </View>
      </MovableView>

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={() => {
          setProps({...props, status: 'connected'});
        }}
        onRoomDidDisconnect={() => {
          setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        onRoomDidFailToConnect={error => {
          Alert.alert('Error', error.error);
          setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        onParticipantAddedVideoTrack={({participant, track}) => {
          if (track.enabled) {
            setProps({
              ...props,
              videoTracks: new Map([
                ...props.videoTracks,
                [
                  track.trackSid,
                  {
                    participantSid: participant.sid,
                    videoTrackSid: track.trackSid,
                  },
                ],
              ]),
            });
          }
        }}
        onParticipantRemovedVideoTrack={({track}) => {
          const videoTracks = props.videoTracks;
          videoTracks.delete(track.trackSid);
          setProps({...props, videoTracks});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    // flexDirection: 'row',
  },
  form: {
    flex: 1,
    // alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    // margin: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formGroup: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    bottom: '-120%',
    opacity: 0.8,
    height: 250,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  callContainer: {
    flex: 1,
  },

  callWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: -70,
    backgroundColor: '#88B2F8',
  },
  remoteGrid: {
    flex: 1,
  },
  remoteVideo: {
    flex: 1,
  },
  doctortext: {
    bottom: 0,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  optionsContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 0,
    right: 0,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  localVideo: {
    position: 'absolute',
    right: 5,
    bottom: 180,
    width: dimensions.width / 4,
    height: dimensions.height / 4,
    zIndex: 1,
  },
  // camera: {
  //   borderRadius: 999,
  //   flexShrink: 0,
  //   marginBottom: -150,
  //   marginLeft: 125,
  //   borderColor: '#fff',
  //   borderWidth: 4,
  //   justifyContent: 'center',
  //   minHeight: '21%',
  //   minWidth: '20%',
  //   maxWidth: '38%',
  //   overflow: 'hidden',
  // },
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default TwilioVideoChat;
