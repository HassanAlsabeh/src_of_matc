import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Modal as MOD,
  PanResponder,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';
import {MAIN_COLOR} from '../global/css/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-scalable-image';
// import StorageProvider from '../provider/StorageProvider';
import moment from 'moment';
import GradientButton from '../global/elements/GradientButton';
import SimpleToast from 'react-native-simple-toast';
import I18n from '../provider/TranslationProvider';

export default class TwilioVideoCall extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    endSessionPressed: PropTypes.func,
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    transparent: PropTypes.bool,
    animationType: PropTypes.string,
    roomName: PropTypes.string.isRequired,
    onRequestUpload: PropTypes.func,
  };

  positionAnim;
  twilioRef;
  pan;
  panResponder;
  timeInterval;
  consult_start_time = 'consult_start_time';

  constructor(props) {
    super(props);
    this.state = {
      currentClick: 1,
      token: '',
      videoTracks: new Map(),
      status: 'disconnected',
      isAudioEnabled: true,
      participants: [],
      selectedVideoTrack: null,
      participantDisconnected: false,
      startTime: '',
      showModal: this.props.visible ?? false,
    };
    this.twilioRef = React.createRef();
    this.pan = new Animated.ValueXY();
    let d = Dimensions.get('screen');
    this.pan.x.setValue(d.width - 125);
    this.pan.y.setValue(d.height - 400);

    this.panResponder = PanResponder.create({
      onResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        let moveX,
          moveY = 0;
        let maxx = gestureState.moveX + 62.5;
        let minx = gestureState.moveX - 62.5;
        let maxy = gestureState.moveY + 100;
        let miny = gestureState.moveY - 100;
        let d = Dimensions.get('screen');
        if (maxx >= d.width) {
          moveX = d.width - 125;
        } else if (minx <= 0) {
          moveX = 0;
        } else {
          moveX = gestureState.moveX - 62.5;
        }
        if (maxy >= d.height) {
          moveY = d.height - 200;
        } else if (miny <= 0) {
          moveY = 0;
        } else {
          moveY = gestureState.moveY - 100;
        }
        this.pan.x.setValue(moveX);
        this.pan.y.setValue(moveY);
        Animated.event([null, {dx: this.pan.x, dy: this.pan.y}], {
          useNativeDriver: true,
        });
      },
      onPanResponderRelease: (evt, gesture) => {
        Animated.event([null, {dx: this.pan.x, dy: this.pan.y}], {
          useNativeDriver: true,
        });
      },
    });

    // this.positionAnim = new Animated.Value(10);
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.setState({
        showModal: this.props.visible,
      });
    }
  }

  componentDidMount() {
    this.setState({
      token: '',
      videoTracks: new Map(),
      status: 'disconnected',
      isAudioEnabled: true,
      roomName: '',
      joinTime: 1,
      joinTimeDisplay: '',
      showModal: this.props.visible ?? true,
    });

    this.positionAnim = new Animated.Value(0);
    if (this.props.token) {
      this.setState(
        {
          token: this.props.token,
          // status: 'connecting'
        },
        () => {
          this._onConnectStart().then();
        },
      );
    }
    setTimeout(() => {
      this.toggleMenu(true);
    }, 10000);
  }

  render() {
    const {status} = this.state;
    return (
      <MOD
        animationType={this.props.animationType ?? 'slide'}
        transparent={this.props.transparent ?? true}
        visible={this.state.showModal}
        onDismiss={() => {
          console.log('dismiss');
        }}
        onRequestClose={() => {
          // this._onEndButtonPress();
          if (this.props.onRequestClose) {
            this.props.onRequestClose();
          }
          this.setState({
            showModal: false,
          });
        }}
        onShow={() => {
          // this.positionAnim = new Animated.Value(0);
          if (this.props.token) {
            this.setState(
              {
                token: this.props.token,
                // status: 'connecting'
              },
              () => {
                this._onConnectStart().then();
              },
            );
          }
        }}>
        <SafeAreaView style={{flex: 1, backgroundColor: MAIN_COLOR}}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.container]}
            onPress={() => {
              this.toggleMenu();
            }}>
            {this.renderStates()}
            {status !== 'disconnected' ? this.renderTools() : <></>}
            {this.renderTopBar()}

            <TwilioVideo
              ref={this.twilioRef}
              onRoomDidConnect={roomName => {
                this._onRoomDidConnect(roomName);
              }}
              onRoomDidDisconnect={roomName => {
                this._onRoomDidDisconnect(roomName);
              }}
              onRoomDidFailToConnect={error => {
                this._onRoomDidFailToConnect(error);
              }}
              onParticipantAddedVideoTrack={participant => {
                this._onParticipantAddedVideoTrack(participant);
              }}
              onParticipantRemovedVideoTrack={participant => {
                this._onParticipantRemovedVideoTrack(participant);
                this.setState({
                  status: 'participant_disconnected',
                });
              }}
              onRoomParticipantDidDisconnect={evt => {
                this.setState({
                  status: 'reconnecting',
                });
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </MOD>
    );
  }

  renderStates() {
    const {status} = this.state;
    switch (status) {
      case 'disconnected':
        return this.renderConnection();
      case 'connecting':
        return this.renderConnecting();
      case 'connected':
        return this.renderCall();
      case 'reconnecting':
        return this.renderReConnecting();
      case 'participant_disconnected':
        return this.renderReConnecting(
          I18n.t('video_call.status_dr_disconnected'),
        );
    }
  }

  renderTools() {
    return (
      <Animated.View
        style={[styles.optionsContainer, {bottom: this.positionAnim}]}>
        <TouchableOpacity
          style={[styles.optionButton, styles.buttonFlip]}
          onPress={() => {
            this._onFlipButtonPress();
          }}>
          <Icon name={'camera-reverse'} color={'white'} size={24} />
          {/*<Text style={styles.buttonText}>Flip</Text>*/}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, styles.buttonEnd]}
          onPress={() => {
            this._onEndButtonPress();
          }}>
          <Icon
            style={{
              transform: [{rotate: '135deg'}],
            }}
            name={'call'}
            color={'white'}
            size={24}
          />
          {/*<Text style={styles.buttonText}>End</Text>*/}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, styles.buttonMute]}
          onPress={() => {
            this._onMuteButtonPress();
          }}>
          <Icon
            name={this.state.isAudioEnabled ? 'mic' : 'mic-off'}
            color={'white'}
            size={24}
          />
          {/*<Text style={styles.buttonText}>{this.state.isAudioEnabled ? "Mute" : "Unmute"}</Text>*/}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderConnection() {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Couldn't connect to server!</Text>
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
          <TouchableOpacity
            style={[styles.optionButton, styles.buttonEnd]}
            onPress={() => {
              this._onEndButtonPress();
            }}>
            <Icon
              style={{
                transform: [{rotate: '135deg'}],
              }}
              name={'call'}
              color={'white'}
              size={24}
            />
            {/*<Text style={styles.buttonTextSmall}>End</Text>*/}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, styles.buttonFlip]}
            onPress={() => {
              this._onReloadPress();
            }}>
            <Icon name={'reload'} color={'white'} size={24} />
            {/*<Text style={styles.buttonTextSmall}>Reload</Text>*/}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderConnecting() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          },
        ]}>
        <Text style={{color: 'white', fontSize: 22}}>
          {I18n.t('video_call.status_connecting')}
        </Text>
      </View>
    );
  }

  renderReConnecting(message = I18n.t('video_call.status_reconnecting')) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          },
        ]}>
        <Text style={{color: 'white', fontSize: 22}}>{message})</Text>
      </View>
    );
  }

  renderCall() {
    const {status} = this.state;
    return (
      <View style={styles.callContainer}>
        {status === 'connected' ? this.renderParticipantVideos() : <></>}
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: this.pan.x,
              top: this.pan.y,
            },
          ]}
          {...this.panResponder.panHandlers}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.localVideoContainer}>
              <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }

  renderParticipantVideos() {
    let videoTracks = this.state.videoTracks;
    let keys = videoTracks.keys();
    let selectedParticipant = null;
    let selectedVideoTrack = this.state.selectedVideoTrack;
    if (selectedVideoTrack === null) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            },
          ]}>
          <Text style={{color: 'white', fontSize: 22, textAlign: 'center'}}>
            {I18n.t('video_call.status_please_wait_dr')}
          </Text>
        </View>
      );
    }
    return (
      <View>
        <View>
          <TwilioVideoParticipantView
            style={styles.remoteVideo}
            key={selectedVideoTrack[0]}
            trackIdentifier={selectedVideoTrack[1]}
          />
          <View style={styles.participantName}>
            <Text style={styles.participantNameText}>
              {selectedVideoTrack[1].identity}{' '}
            </Text>
          </View>
        </View>
        <View>
          <TwilioVideoParticipantView
            style={styles.remoteVideo}
            key={videoTracks.get(selectedParticipant.trackSid)}
            trackIdentifier={videoTracks.get(
              selectedParticipant.trackIdentifier,
            )}
          />
        </View>
        <View style={styles.remoteGrid}>
          {Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
            return (
              <TwilioVideoParticipantView
                style={styles.remoteVideo}
                key={trackSid}
                trackIdentifier={trackIdentifier}
              />
            );
          })}
        </View>
      </View>
    );
  }

  renderTopBar() {
    const {roomName, joinTimeDisplay} = this.state;
    return (
      <Animated.View
        style={[
          styles.topBar,
          {
            top: this.positionAnim,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            this.props.showVideo = false;
            this.setState({
              showModal: false,
            });
          }}>
          <Icon name={'chevron-back-outline'} color={'white'} size={34} />
        </TouchableOpacity>
        <View>
          <Image source={require('../assets/images/icon.png')} width={64} />
        </View>
        <View>
          <Text style={{fontSize: 20, color: 'rgb(212,212,212)'}}>
            {this.props.roomName}
          </Text>
        </View>
        <View
          style={{justifyContent: 'flex-end', maxWidth: '20%', width: '20%'}}>
          <Text style={{fontSize: 20, color: 'rgb(212,212,212)'}}>
            {joinTimeDisplay}
          </Text>
        </View>
      </Animated.View>
    );
  }

  renderNormalPage() {
    const pageWidth = Dimensions.get('screen').width;
    const pageHeight = Dimensions.get('screen').height;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: pageHeight,
        }}>
        <GradientButton
          onPressButton={() => {
            this.setState({
              showModal: true,
            });
            // this._joinVideo();
            // this._handleFacebookLogin.bind(this);
          }}
          setting={{
            btnWidth: pageWidth * 0.95,
            btnHeight: Platform.isPad ? 65 : 45,
          }}
          // settings={shadowOpt}
          btnText="BACK TO ROOM"
        />
        <View
          style={{
            marginTop: '5%',
          }}
        />
        <GradientButton
          onPressButton={() => {
            this.props.onRequestUpload();
          }}
          setting={{
            btnWidth: pageWidth * 0.95,
            btnHeight: Platform.isPad ? 65 : 45,
          }}
          // settings={shadowOpt}
          btnText="UPLOAD FILES"
        />
      </View>
    );
  }

  async _onConnectStart() {
    const {token} = this.state;
    if (token === '' || token == null) {
      Alert.alert(I18n.t('video_call.error_invalid_token'));
      return;
    }
    this.twilioRef.current.connect({accessToken: token});
    this.setState({
      status: 'connecting',
    });
    SimpleToast.show(I18n.t('video_call.info_message'), SimpleToast.LONG);
  }

  async _onEndButtonPress() {
    Alert.alert(
      I18n.t('video_call.dialog_title'),
      I18n.t('video_call.dialog_message'),
      [
        {
          text: I18n.t('video_call.stay_in_call'),
          onPress: () => {},
          style: 'default',
        },
        {
          text: I18n.t('video_call.confirm'),
          onPress: () => {
            // StorageProvider.clearItem(this.consult_start_time);
            clearInterval(this.timeInterval);
            this.twilioRef.current.disconnect();
            this.props.endSessionPressed();
          },
          style: 'destructive',
        },
      ],
    );
  }

  async _onRoomDidConnect({roomName, error}) {
    this.setState({
      status: 'connected',
      roomName,
    });
  }

  _onRoomDidDisconnect({roomName, error}) {
    this.setState({
      status: 'disconnected',
    });
  }

  _onRoomDidFailToConnect(error) {
    this.setState({
      status: 'disconnected',
    });
    Alert.alert(
      'Oops',
      I18n.t('video_call.error_failed_to_connect') + ':' + error.error,
    );
  }

  _onMuteButtonPress = () => {
    const {isAudioEnabled} = this.state;
    this.twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => {
        this.setState({
          isAudioEnabled: isEnabled,
        });
      });
  };

  _onFlipButtonPress = () => {
    this.twilioRef.current.flipCamera();
  };

  async _onParticipantAddedVideoTrack({participant, track}) {
    let {selectedVideoTrack} = this.state;
    if (selectedVideoTrack === null) {
      this.setState({
        selectedVideoTrack: [
          track.trackSid,
          {
            participantSid: participant.sid,
            videoTrackSid: track.trackSid,
            identity: participant.identity,
          },
        ],
        status: 'connected',
        participantDisconnected: false,
      });
      await this._startCountingTime();
      this.showMenu();
    }
    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          {
            participantSid: participant.sid,
            videoTrackSid: track.trackSid,
            identity: participant.identity,
          },
        ],
      ]),
    });
  }

  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    const videoTracksLocal = this.state.videoTracks;
    videoTracksLocal.delete(track.trackSid);
    this.setState(
      {
        videoTracks: videoTracksLocal,
        status: 'participant_disconnected',
        selectedVideoTrack: null,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  async _onReloadPress() {
    await this._onConnectStart();
  }

  async toggleMenu(forceHide = false) {
    const {currentClick} = this.state;
    if (forceHide) {
      this.setState(
        {
          currentClick: 0,
        },
        () => {
          setTimeout(() => {
            Animated.timing(this.positionAnim, {
              toValue: -250,
              duration: 250,
              useNativeDriver: false,
              easing: Easing.elastic(1),
            }).start();
          }, 100);
        },
      );
      return;
    }
    if (currentClick === 1) {
      this.setState(
        {
          currentClick: 0,
        },
        () => {
          setTimeout(() => {
            Animated.timing(this.positionAnim, {
              toValue: -250,
              duration: 250,
              useNativeDriver: false,
              easing: Easing.elastic(1),
            }).start();
          }, 100);
        },
      );
    } else {
      this.setState(
        {
          currentClick: 1,
        },
        () => {
          setTimeout(() => {
            Animated.timing(this.positionAnim, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
              easing: Easing.elastic(1),
            }).start();
          }, 100);
        },
      );
    }
  }

  async showMenu() {
    this.setState(
      {
        currentClick: 1,
      },
      () => {
        setTimeout(() => {
          Animated.timing(this.positionAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.elastic(1),
          }).start();
        }, 100);
      },
    );
  }

  async _startCountingTime() {
    // let startTime = await StorageProvider.getItem(this.consult_start_time);
    if (startTime !== '' && startTime !== null && startTime !== 'undefined') {
      let date = new Date(startTime);
      startTime = moment(date.getTime()).toDate();
    } else {
      startTime = moment().toDate();
      // await StorageProvider.storeItem(this.consult_start_time, startTime);
    }
    // await StorageProvider.clearItem(this.consult_start_time);
    this.setState({
      joinTime: 0,
      startTime,
    });
    this.timeInterval = setInterval(() => {
      let now = moment();
      let diff = moment.duration(now.diff(startTime));
      // let lastTime = this.state.joinTime + 1;
      let hours = (diff.hours() + '').padStart(2, '0');
      let mins = (diff.minutes() + '').padStart(2, '0');
      let seconds = (diff.seconds() + '').padStart(2, '0');
      let display = (hours === '00' ? '' : hours + ':') + mins + ':' + seconds;
      this.setState({
        joinTime: 0,
        joinTimeDisplay: display,
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    // backgroundColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(0,0,0,0.9)',
    // minHeight: Dimensions.get('screen').height
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginHorizontal: '5%',
    // marginRight: 70,
    // marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
    width: '90%',
  },
  button: {
    marginTop: 100,
    width: '90%',
    backgroundColor: 'blue',
    color: 'white',
    height: 200,
  },
  localVideoContainer: {
    // position: 'absolute',
    // right: 0,
    // bottom: '10%',
    // zIndex: 10,
    // width: '100%',
  },
  localVideo: {
    // flex: 1,
    width: 125,
    height: 200,
    borderRadius: 2,
    borderColor: '#ffffff',
    zIndex: 10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 10, //'10%',
    right: 0,
    height: 100,
    backgroundColor: 'rgba(210,210,210,0.0)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(210,210,210,0)',
    bottom: 0,
    paddingVertical: '5%',
  },
  status: {
    color: 'white',
    fontSize: 24,
    marginBottom: '2%',
  },
  buttonEnd: {
    backgroundColor: 'rgb(239,0,0)',
  },
  buttonMute: {
    backgroundColor: 'rgba(146,146,146,0.8)',
  },
  buttonFlip: {
    // backgroundColor: 'rgb(39,108,0)',
    backgroundColor: 'rgba(146,146,146,0.8)',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextSmall: {
    color: 'white',
    fontSize: 10,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    position: 'absolute',
    height: '9%',
    paddingHorizontal: '5%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  participantName: {
    position: 'absolute',
    bottom: '2%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '1%',
  },
  participantNameText: {
    color: '#e2e2e2',
    paddingLeft: '5%',
    fontSize: 20,
  },
});
