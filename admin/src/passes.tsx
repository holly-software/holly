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
  ShowButton,
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
      <ShowButton label="" />
    </Datagrid>
  </List>
);

// @ts-ignore
export const PassShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField label="Holder" source="holder" reference="users">
        <TextField source="name" label="Holder"/>
      </ReferenceField>
      <ReferenceField label="Issuer" source="issuer" reference="users">
        <TextField source="name" label="Issuer"/>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);