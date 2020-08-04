import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Layout from './components/layout';
import ApplicationNavigator from './navigation/navigators';
import SplashScreen from 'react-native-splash-screen';
import FlashMessagee from 'react-native-flash-message';

export default class App extends Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return (
      <Layout>
        <ApplicationNavigator />
        <FlashMessagee position="top" />
      </Layout>
    );
  }
}
