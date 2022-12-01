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
  ReferenceField,
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
      <ReferenceField label="Holder" source="holder" reference="users">
        <TextField source="name" label="Holder"/>
      </ReferenceField>
      <ReferenceField label="Issuer" source="issuer" reference="users">
        <TextField source="name" label="Issuer"/>
      </ReferenceField>
    </Datagrid>
  </List>
);

// @ts-ignore
export const PassShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField label="holder" source="holder" reference="users">
        <TextField source="name" label="holder"/>
      </ReferenceField>
      <ReferenceField label="issuer" source="issuer" reference="users">
        <TextField source="name" label="issuer"/>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);