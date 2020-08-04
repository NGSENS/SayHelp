import {StyleSheet} from 'react-native';
import {Colors} from '../../../styles';
import {FONT_SIZE_16} from '../../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.TEAL_BLUE,
  },
  text: {
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  linkButton: {
    color: Colors.BONE,
    backgroundColor: 'transparent',
    fontSize: FONT_SIZE_16,
  },
  infoMsg: {
    color: 'white',
    fontSize: FONT_SIZE_16,
    paddingRight: 5,
  },
  errorMsg: {
    color: Colors.VINTAGE_RED,
    fontSize: FONT_SIZE_16,
  },
});
