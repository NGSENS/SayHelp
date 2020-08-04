import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = getStatusBarHeight();

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.TEAL_BLUE,
    borderBottomColor: Colors.BONE,
    borderBottomWidth: 4,
  },
  headerTitle: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_PAPRIKA_REGULAR,
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    height: WINDOW_HEIGHT - STATUSBAR_HEIGHT - 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_28,
    textAlign: 'center',
    color: Colors.TEAL_BLUE,
  },
  loader: {
    position: 'absolute',
    bottom: -20,
    width: 450,
    height: 450,
  },
});
