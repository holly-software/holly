import { Admin, Resource } from "react-admin";
import { UserList, UserShow } from "./users";
import { PassList, PassShow } from "./passes";
import firebaseConfig from "../../firebase-config.json";

import {
	FirebaseDataProvider,
	FirebaseAuthProvider,
} from "react-admin-firebase";

import CustomLoginPage from "./CustomLoginPage";

import firebase from "firebase/compat/app";

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
