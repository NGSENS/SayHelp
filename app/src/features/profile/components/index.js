import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import MyStatusBar from '../../../components/mystatusbar';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {Block, Icon, Text, theme} from 'galio-framework';
import {Colors} from '../../../styles';
import default_user from '../../../assets/images/default_user.png';
import * as screenNames from '../../../navigation/screen_names';
import {getUserProfilePictureURL} from '../../../utils/user';

const BASE_SIZE = theme.SIZES.BASE;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic: null,
    };
  }

  getUserProfilePicture() {
    getUserProfilePictureURL()
      .then(url => {
        this.setState({profilePic: url});
      })
      .catch(() => console.log('The user has no profile picture'));
  }

  componentDidMount() {
    // Get the user profile picture
    this.getUserProfilePicture();

    this.props.navigation.addListener('focus', () => {
      // Update profile image if needed
      this.getUserProfilePicture();
    });
  }

  render() {
    let profileImage;
    if (this.state.profilePic != null) {
      profileImage = (
        <Image style={[styles.avatar]} source={{uri: this.state.profilePic}} />
      );
    } else {
      profileImage = <Image style={styles.avatar} source={default_user} />;
    }

    return (
      <View style={styles.container}>
        <MyStatusBar
          backgroundColor={Colors.TEAL_BLUE}
          barStyle="light-content"
        />
        <Block safe flex>
          <View style={styles.header} />
          <View style={styles.contentAvatar}>{profileImage}</View>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(screenNames.UPDATE_PROFILE)
              }
              activeOpacity={1}>
              <Block row center card shadow space="between" style={styles.card}>
                <LinearGradient
                  start={{x: 0.45, y: 0.45}}
                  end={{x: 0.9, y: 0.9}}
                  colors={[Colors.POLISHED_PINE, Colors.ETON_BLUE]}
                  style={[styles.gradient, styles.left]}>
                  <Icon
                    name="ios-list"
                    family="ionicon"
                    color={theme.COLORS.WHITE}
                    size={30}
                  />
                </LinearGradient>

                <Block flex>
                  <Text
                    size={BASE_SIZE * 1.1}
                    color={Colors.GRAY_MS}
                    style={{fontWeight: 'bold'}}>
                    Personal informations
                  </Text>
                  <Text size={BASE_SIZE * 0.875} muted>
                    Update personal informations
                  </Text>
                </Block>
                <View style={styles.right}>
                  <Icon
                    size={BASE_SIZE * 1.25}
                    name="ios-arrow-forward"
                    family="ionicon"
                  />
                </View>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(screenNames.CAREGIVER)
              }
              activeOpacity={1}>
              <Block row center card shadow space="between" style={styles.card}>
                <LinearGradient
                  start={{x: 0.45, y: 0.45}}
                  end={{x: 0.9, y: 0.9}}
                  colors={[Colors.POLISHED_PINE, Colors.ETON_BLUE]}
                  style={[styles.gradient, styles.left]}>
                  <Icon
                    name="hands-helping"
                    family="font-awesome-5"
                    color={theme.COLORS.WHITE}
                    size={30}
                  />
                </LinearGradient>

                <Block flex>
                  <Text
                    size={BASE_SIZE * 1.1}
                    color={Colors.GRAY_MS}
                    style={{fontWeight: 'bold'}}>
                    Become a caregiver
                  </Text>
                  <Text size={BASE_SIZE * 0.875} muted>
                    Become a caregiver to help others
                  </Text>
                </Block>
                <View style={styles.right}>
                  <Icon
                    size={BASE_SIZE * 1.25}
                    name="ios-arrow-forward"
                    family="ionicon"
                  />
                </View>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => auth().signOut()}
              activeOpacity={1}>
              <Block row center card shadow space="between" style={styles.card}>
                <LinearGradient
                  start={{x: 0.45, y: 0.45}}
                  end={{x: 0.9, y: 0.9}}
                  colors={[Colors.POLISHED_PINE, Colors.ETON_BLUE]}
                  style={[styles.gradient, styles.left]}>
                  <Icon
                    name="ios-exit"
                    family="ionicon"
                    color={theme.COLORS.WHITE}
                    size={30}
                  />
                </LinearGradient>

                <Block flex>
                  <Text
                    size={BASE_SIZE * 1.1}
                    color={Colors.RED}
                    style={{fontWeight: 'bold'}}>
                    Log out
                  </Text>
                </Block>
                <View style={styles.right}>
                  <Icon
                    size={BASE_SIZE * 1.25}
                    name="ios-arrow-forward"
                    family="ionicon"
                    color={Colors.RED}
                  />
                </View>
              </Block>
            </TouchableOpacity>
          </View>
        </Block>
      </View>
    );
  }
}

export default Profile;
