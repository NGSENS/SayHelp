import {StyleSheet, Dimensions} from 'react-native';
import {Typography} from '../../styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 55,
    borderRadius: 30,
    color: 'white',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
  },
  inputWrapper: {
    marginTop: 5,
    marginBottom: 5,
  },
  inlineIcon: {
    color: 'white',
    position: 'absolute',
    zIndex: 99,
    left: 35,
    top: 12,
  },
});
