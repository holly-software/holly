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
  ShowButton,
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
      <TextField label="Teacher" source="role_teacher" />
      <TextField label="Admin" source="role_admin" />
      <ShowButton label="" />
    </Datagrid>
  </List>
);

// @ts-ignore
export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField label="Teacher" source="role_teacher" />
      <TextField label="Admin" source="role_admin" />
    </SimpleShowLayout>
  </Show>
);