import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Typography} from '../../../styles';

const WINDOW_WIDTH = Dimensions.get('window').width;

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
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 60,
  },
  // Swipeable panel styles
  panel: {
    height: Dimensions.get('window').height - 180,
  },
  panelContainer: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  panelTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_28,
    marginBottom: 40,
  },
  panelText: {
    textAlign: 'justify',
  },
  panelButton: {
    marginTop: 30,
    backgroundColor: Colors.TEAL_BLUE,
    padding: 10,
    borderRadius: 50,
    width: WINDOW_WIDTH - 30,
    borderWidth: 1,
    borderColor: Colors.TEAL_BLUE,
  },
  panelButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  // Chat room style
  listContainer: {
    paddingLeft: 0,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  listContentContainer: {
    marginTop: -10,
    height: '100%',
    justifyContent: 'flex-start',
  },
  leftAvatarContainer: {
    marginLeft: -10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_18,
  },
  listSubtitle: {
    color: '#86868A',
  },
  // Chat conversation style
  sendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    backgroundColor: Colors.TEAL_BLUE,
    padding: 9,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 80,
    marginRight: 10,
  },
  inputToolBarContainer: {
    backgroundColor: '#f0f0f0',
    borderTopColor: '#dbd9d9',
    borderBottomColor: '#dbd9d9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  composerTextInput: {
    paddingTop: 9,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dbd9d9',
  },
  mapContainer: {
    width: 155,
    height: 100,
    margin: 3,
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});
