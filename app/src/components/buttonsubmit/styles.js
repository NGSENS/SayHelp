import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../styles';

const MARGIN = 50;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BONE,
    height: MARGIN,
    borderRadius: 30,
    zIndex: 100,
    marginTop: 5,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: Colors.BONE,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: Colors.BONE,
  },
  text: {
    color: Colors.TEAL_BLUE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
