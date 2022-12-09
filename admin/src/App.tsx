import { Admin, Resource } from "react-admin";
import { UserList, UserShow } from "./users";
import { PassList, PassShow } from "./passes";

import {
	FirebaseDataProvider,
	FirebaseAuthProvider,
} from "react-admin-firebase";

import CustomLoginPage from "./CustomLoginPage";

import firebase from "firebase/compat/app";

const firebaseConfig = {
	apiKey: "AIzaSyBH10BCoFKPtPWeaW4_xT3g5CSfqgnAwrw",
	authDomain: "holly-prod.firebaseapp.com",
	projectId: "holly-prod",
	storageBucket: "holly-prod.appspot.com",
	messagingSenderId: "100310942224",
	appId: "1:100310942224:web:2e9dc19ec0e65accae8095",
	measurementId: "G-FT1H160GDK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage(firebaseApp);

const authProvider = FirebaseAuthProvider(firebaseConfig, {});
const dataProvider = FirebaseDataProvider(firebaseConfig, {
	logging: true,
	app: firebaseApp,
	persistence: "local",
	dontAddIdFieldToDoc: true,
	lazyLoading: {
		enabled: true,
	},
	firestoreCostsLogger: {
		enabled: true,
	},
});

const App = () => (
	<>
		<Admin
			loginPage={CustomLoginPage}
			dataProvider={dataProvider}
			authProvider={authProvider}
		>
			<Resource name="users" list={UserList} show={UserShow} />
			<Resource name="passes" list={PassList} show={PassShow} />
		</Admin>
	</>
);

export default App;
