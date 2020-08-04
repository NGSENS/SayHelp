import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
