import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from "firebase/compat/app";

const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "#/",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
	callbacks: {
		signInSuccessWithAuthResult: (result: { credential: any; user: any }) => {
			const user = result.user;

			// check if in developer mode
			if (process.env.NODE_ENV === "development") {
				return true;
			}

			if (!user.email.endsWith("@pps.net")) {
				firebase.auth().signOut();
				return false;
			}

			return true;
		},
	},
};

const SignInScreen = () => (
	<StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
);

// @ts-ignore
const CustomLoginForm = (props) => (
	<div>
		<LoginForm {...props} />
		<SignInScreen />
	</div>
);

// @ts-ignore
const CustomLoginPage = (props) => (
	<Login {...props}>
		<CustomLoginForm {...props} />
	</Login>
);

export default CustomLoginPage;
