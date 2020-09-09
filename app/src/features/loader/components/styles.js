import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {FONT_SIZE_20} from '../../../styles/typography';

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
  remainingTimeContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  remainingTime: {
    fontSize: FONT_SIZE_20,
    color: Colors.GRAY_LIGHT_2,
  },
  cancelButtonContainer: {
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: Colors.VINTAGE_RED,
    padding: 5,
    borderRadius: 10,
    width: 90,
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    bottom: -20,
    width: 450,
    height: 450,
  },
});
