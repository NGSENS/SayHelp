import {StyleSheet} from 'react-native';
import {Colors, Typography} from '../../../styles';

export default StyleSheet.create({
  tabButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    height: 58,
    width: 58,
    backgroundColor: Colors.TEAL_BLUE,
    borderRadius: 100,
  },
  tabButtonIcon: {
    height: 40,
    width: 40,
  },
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
    paddingTop: 30,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: 'bold',
    color: Colors.GRAY_SC,
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
    color: '#494A69',
    fontSize: Typography.FONT_SIZE_16,
  },
  button: {
    backgroundColor: Colors.VINTAGE_RED,
    borderWidth: 4,
    borderColor: Colors.BONE,
    padding: 10,
    marginTop: 20,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_20,
  },
  warningButton: {
    backgroundColor: '#FFC107',
  },
  warningButtonText: {
    color: Colors.WHITE,
  },
  // Swipeable panel styles
  panelContainer: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  panelTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_28,
    marginBottom: 10,
  },
  panelButton: {
    marginTop: 20,
    backgroundColor: Colors.VINTAGE_RED,
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  panelButtonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_20,
  },
  panelEmergencyDescription: {
    height: 150,
    alignItems: 'flex-start',
    paddingVertical: 5,
    borderColor: Colors.GRAY_MS_BORDER,
    borderWidth: 2,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 20,
    fontSize: 16 * 0.875,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: Colors.GRAY_MS_BORDER,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: '#9FA5AA',
    fontSize: 16 * 0.875,
  },
  iconContainer: {
    top: 30,
    right: 15,
  },
});
