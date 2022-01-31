import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/Colors';

export default StyleSheet.create({
  chatMessageContainer: {
    width: '100%',
    position: 'relative',
  },
  chatMessage: {
    maxWidth: '70%',
    marginTop: '5%',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    marginHorizontal: '1%',
    position: 'relative',
    borderRadius: 22,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 999,
  },
  chatUpload: {
    maxWidth: '70%',
    marginTop: '5%',
    // borderWidth: 1,
    // borderColor: 'white',
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    marginHorizontal: '1%',
    position: 'relative',
    // backgroundColor:COLORS.colorPrimary,
    borderRadius: 22,
    // shadowOffset: {width: 10, height: 10},
    // shadowColor: 'black',
    // shadowOpacity: 0.1,
    // elevation: 3,
    // zIndex: 999,
  },
  chatMessageText: {
    fontSize: normalize(12),
    color: 'COLORS.white',
  },
  chatDateCreated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: normalize(7),
    // width:'100%',
    // paddingTop: '5%',
  },
  chatDateCreatedText: {
    fontSize: normalize(7),
    paddingTop: '5%',
    marginHorizontal: '2%',
    color: COLORS.colorGrayBg,
  },
  chatDateCreatedUpload: {
    fontSize: normalize(7),
    paddingTop: '5%',
    color: COLORS.colorPrimary,
  },
  chatDeliveredIcon: {
    paddingHorizontal: '2%',
    paddingTop: '5%',
  },
});
