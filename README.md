#SayHelp

##Description
###Context
In emergency situations, the response time of the rescue services is a determining factor in the outcome of these events. Indeed, the arrival of the rescue services is in some cases too long to provide assistance within an adequate timeframe. These cases are common in remote areas (mountain, sea, lake) or when there is destruction or lack of communication infrastructure.

###Objective
The objective of this Bachelor's thesis is to develop a mobile application like a social network to find help around you in an emergency situation. SayHelp has been developed to allow users to trigger two types of alerts:

* **Quick alert**: the person is in a very urgent situation and needs the help of someone close by as soon as possible.
* **Targeted alert**: the person is not necessarily in an emergency situation but needs very specific help in a particular medical field.

##Mobile application
The mobile application was developed with the React Native framework. Once you have downloaded the project, follow these steps to test the application (only possible for MacOS users with Xcode installed).

* `cd app/`
* `npx react-native run-ios`
* *You should see SayHelp app running in the iOS Simulator shortly*

##Backend
In the `backend/` directory, you can find all Firebase Cloud Functions invoked by the client application. To run them locally, follow these steps:

* `cd backend/`
* `npm install -g firebase-tools`
* `firebase serve`
