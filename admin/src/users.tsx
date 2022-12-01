import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Filter,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

// @ts-ignore
const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

// @ts-ignore
export const UserList = (props) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

// @ts-ignore
export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);