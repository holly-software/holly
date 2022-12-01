import { Admin, Resource } from "react-admin";
import { UserList } from "./users";
import { PassList } from "./passes";
import { config as firebaseConfig } from "./FIREBASE_CONFIG";

import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';

import CustomLoginPage from './CustomLoginPage';

import firebase from "firebase/compat/app";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage(firebaseApp);

const authProvider = FirebaseAuthProvider(firebaseConfig, {});
const dataProvider = FirebaseDataProvider(firebaseConfig, {
  logging: true,
  app: firebaseApp,
  persistence: 'local',
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
          <Resource
            name="users"
            list={UserList}
          />
          <Resource 
            name="passes"
            list={PassList}
          />
        </Admin>
      </>
);

export default App;