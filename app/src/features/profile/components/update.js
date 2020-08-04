import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ScrollView, Text} from 'react-native';
import {Block, Icon, theme} from 'galio-framework';
import {ListItem} from 'react-native-elements';
import MyStatusBar from '../../../components/mystatusbar';
import KeyboardAvoidingAndDismissingView from '../../../components/keyboard';
import ImagePicker from 'react-native-image-crop-picker';
import {getUserEmail, getUserProfilePictureURL} from '../../../utils/user';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import {Colors, Typography} from '../../../styles';
import default_user from '../../../assets/images/default_user.png';
import {getUser, updateUser} from '../../../utils/user';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic: null,
      user: {
        email: null,
        username: null,
        lastname: null,
        firstname: null,
        phoneNumber: null,
        emergencyNumber: null,
      },
    };
  }

  componentDidMount() {
    // Get the user profile picture
    getUserProfilePictureURL()
      .then(url => {
        this.setState({profilePic: url});
      })
      .catch(() => console.log('The user has no profile picture'));

    // Use state to manage component data
    getUser().then(user => {
      this.setState({user: user});
    });
  }

  onUpdate = () => {
    updateUser(this.state.user);
    // TODO check inputs client and server side
    this.props.navigation.goBack();
  };

  onUpdateImage() {
    const uid = 'Profile';

    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        const imagePath = image.path;
        const imageName = getUserEmail();
        const imageRef = storage()
          .ref(uid)
          .child(imageName);

        imageRef.putFile(imagePath).then(snapshot => {
          console.log(
            `${imageName} profile picture has been successfully uploaded.`,
          );
        });

        this.setState({profilePic: imagePath});
      })
      .catch(error => console.log(error));
  }

  render() {
    const inputList = [
      {
        title: 'Username',
        key: 'username',
        value: this.state.user.username,
        icon: 'user-circle',
        customProps: '',
      },
      {
        title: 'Lastname',
        key: 'lastname',
        value: this.state.user.lastname,
        icon: 'list-ul',
        customProps: '',
      },
      {
        title: 'Firstname',
        key: 'firstname',
        value: this.state.user.firstname,
        icon: 'list-ul',
        customProps: '',
      },
      {
        title: 'Phone number',
        key: 'phoneNumber',
        value: this.state.user.phoneNumber,
        icon: 'phone',
        customProps: {
          keyboardType: 'numeric',
        },
      },
      {
        title: 'Emergency number',
        key: 'emergencyNumber',
        value: this.state.user.emergencyNumber,
        icon: 'phone',
        customProps: {
          style: {color: 'red'},
        },
      },
    ];

    let profileImage;
    if (this.state.profilePic != null) {
      profileImage = (
        <Image style={[styles.avatar]} source={{uri: this.state.profilePic}} />
      );
    } else {
      profileImage = <Image style={styles.avatar} source={default_user} />;
    }

    return (
      <KeyboardAvoidingAndDismissingView>
        <View style={styles.container}>
          <MyStatusBar
            backgroundColor={Colors.TEAL_BLUE}
            barStyle="light-content"
          />
          <Block safe flex>
            <View style={styles.header} />
            <TouchableOpacity
              onPress={() => {
                this.onUpdateImage();
              }}
              style={styles.contentAvatar}>
              {profileImage}
              <Icon
                style={styles.icon}
                name="camera"
                family="font-awesome-5"
                color={theme.COLORS.BLACK}
              />
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.body}>
                <ListItem
                  style={[styles.inputContainer, {marginBottom: 50}]}
                  titleStyle={styles.inputTitle}
                  title="Email"
                  input={{
                    inputStyle: [
                      styles.input,
                      {fontSize: Typography.FONT_SIZE_13, marginLeft: -70},
                    ],
                    leftIcon: (
                      <Icon
                        family="font-awesome-5"
                        name="envelope"
                        color={Colors.GRAY_MS}
                        style={{marginLeft: -180}}
                      />
                    ),
                    disabled: true,
                    value: this.state.user.email,
                  }}
                />
                {inputList.map((item, i) => (
                  <ListItem
                    key={item.key}
                    style={[
                      styles.inputContainer,
                      i !== 0 ? {borderTopWidth: 0} : {},
                    ]}
                    titleStyle={[
                      styles.inputTitle,
                      i === 4 ? {color: Colors.RED} : {},
                    ]}
                    title={item.title}
                    input={{
                      value: item.value,
                      placeholder: '-',
                      placeholderTextColor: Colors.GRAY_MS,
                      inputStyle: styles.input,
                      leftIcon: (
                        <Icon
                          family="font-awesome-5"
                          name={item.icon}
                          color={Colors.GRAY_MS}
                          style={styles.inputIcon}
                        />
                      ),
                      onChangeText: text => {
                        this.setState({
                          user: {...this.state.user, [item.key]: text},
                        });
                      },
                      ...item.customProps,
                    }}
                  />
                ))}
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {backgroundColor: Colors.GRAY_WHITE},
                      ]}
                      onPress={() => this.props.navigation.goBack()}>
                      <Text
                        style={[styles.buttonText, {color: Colors.TEAL_BLUE}]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.onUpdate()}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Block>
        </View>
      </KeyboardAvoidingAndDismissingView>
    );
  }
}

export default UpdateProfile;
