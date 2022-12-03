import React from "react";
import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from './StyledFirebaseAuth';
import firebase from "firebase/compat/app";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '#/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

const SignInScreen = () => <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig}/>;

// @ts-ignore
const CustomLoginForm = props => (
  <div>
    <LoginForm {...props} />
    <SignInScreen />
  </div>
);

// @ts-ignore
const CustomLoginPage = (props) => (
  <Login {...props}>
    <CustomLoginForm {...props}/>
  </Login>
);

export default CustomLoginPage;