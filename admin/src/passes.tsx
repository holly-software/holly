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
const PassFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

// @ts-ignore
export const PassList = (props) => (
  <List {...props} filters={<PassFilter />}>
    <Datagrid>
      <TextField source="holder" />
      <TextField label="Teacher" source="issuer" />
    </Datagrid>
  </List>
);

// @ts-ignore
export const PassShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="holder" />
      <TextField source="issuer" />
    </SimpleShowLayout>
  </Show>
);