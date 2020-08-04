import {StyleSheet} from 'react-native';
import {theme} from 'galio-framework';
import {Colors, Typography} from '../../../styles/';

const BASE_SIZE = theme.SIZES.BASE;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_WHITE,
  },
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: theme.COLORS.WHITE,
    shadowOpacity: 0.4,
    paddingRight: 0,
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.TEAL_BLUE,
    borderBottomColor: Colors.BONE,
    borderBottomWidth: 4,
    height: 100,
    marginBottom: 60,
  },
  smallHeader: {
    backgroundColor: Colors.TEAL_BLUE,
    borderBottomColor: Colors.BONE,
    borderBottomWidth: 4,
  },
  headerTitle: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_PAPRIKA_REGULAR,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
  },
  contentAvatar: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 95,
    top: 90,
    fontSize: 15,
    padding: 8,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: Colors.GRAY_FB,
    overflow: 'hidden',
  },
  body: {
    marginTop: 70,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY_MS_BORDER,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    height: 50,
  },
  inputTitle: {
    color: Colors.GRAY_MS,
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_15,
  },
  inputIcon: {
    marginLeft: -40,
  },
  input: {
    justifyContent: 'center',
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonView: {
    flex: 1,
    margin: 30,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: Colors.TEAL_BLUE,
    borderWidth: 1,
    borderColor: Colors.TEAL_BLUE,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  // Becom a caregiver style
  caregiverTitle: {
    fontSize: Typography.FONT_SIZE_22,
    color: Colors.GRAY_MS,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
    marginBottom: 30,
  },
  caregiverFieldsContainerView: {
    marginBottom: 30,
  },
  caregiverFieldsContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
  },
  caregiverFieldsText: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_16,
  },
});
