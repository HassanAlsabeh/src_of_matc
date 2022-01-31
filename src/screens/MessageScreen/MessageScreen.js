import React from 'react';
import {Dimensions, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/Colors';
import {normalize} from '../../provider/Utils';
import ScalableImage from 'react-native-scalable-image';

import styles from './MessageScreen.style';

const MessageScreen = props => {
  let message = props.message;
  let chatMessageSender = {};
  let chatMessageReceived = {};

  let dimension = Dimensions.get('screen');

  if (message.isText) {
    return (
      <View
        key={message.id}
        style={{
          ...styles.chatMessageContainer,
          ...{
            alignItems: message.isSender ? 'flex-end' : 'flex-start',
          },
        }}>
        <View
          style={{
            ...styles.chatMessage,
            ...{
              backgroundColor: message.isSender
                ? COLORS.colorPrimary
                : COLORS.green,
            },
          }}>
          <Text
            style={{
              ...styles.chatMessageText,
              ...{
                textAlign: message.isSender ? 'right' : 'left',
              },
            }}>
            {message.message}
          </Text>
          <View style={{...styles.chatDateCreated}}>
            <Text style={{...styles.chatDateCreatedText}}>
              {message.date_created}
            </Text>
            <View style={{...styles.chatDelivered}}>
              <Icon
                style={{...styles.chatDeliveredIcon}}
                name={
                  !message.is_delivered
                    ? 'checkmark-outline'
                    : 'checkmark-done-outline'
                }
                size={16}
                color={COLORS.colorGrayBg}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      key={message.id}
      style={{
        ...styles.chatMessageContainer,
        ...{
          alignItems: message.isSender ? 'flex-end' : 'flex-start',
        },
      }}>
      <View
        style={{
          ...styles.chatUpload,
        }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(message.file_url);
          }}
          style={{
            alignItems: message.isSender ? 'flex-end' : 'flex-start',
          }}>
          {message.iconPlaceholder === 'image' ? (
            <ScalableImage
              style={{
                borderRadius: 20,
              }}
              source={{uri: message.file_url}}
              width={dimension.width * 0.45}
            />
          ) : (
            <React.Fragment>
              <Avatar.Icon
                icon={message.iconPlaceholder}
                color={COLORS.yellow}
                size={normalize(32)}
              />
              <Text>FILE:{message.file_extention}</Text>
            </React.Fragment>
          )}
        </TouchableOpacity>
        <View style={{...styles.chatDateCreated}}>
          <Text
            style={{
              ...styles.chatDateCreatedText,
              ...{
                color: COLORS.colorPrimary,
              },
            }}>
            {message.date_created}
          </Text>
          <View style={{...styles.chatDelivered}}>
            <Icon
              style={{...styles.chatDeliveredIcon}}
              name={
                !message.is_delivered
                  ? 'checkmark-outline'
                  : 'checkmark-done-outline'
              }
              size={16}
              color={COLORS.colorPrimary}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageScreen;
