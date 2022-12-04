import {
	Datagrid,
	List,
	Show,
	SimpleShowLayout,
	TextField,
	ReferenceField,
	ShowButton,
	ReferenceInput,
	AutocompleteInput,
} from "react-admin";

// @ts-ignore
const PassFilter = [
	<ReferenceInput source="holder" alwaysOn reference="users">
		<AutocompleteInput optionText="name" />
	</ReferenceInput>,
	<ReferenceInput source="issuer" alwaysOn reference="users">
		<AutocompleteInput optionText="name" />
	</ReferenceInput>,
];

// @ts-ignore
export const PassList = (props) => (
	<List {...props} filters={PassFilter} title="Holly">
		<Datagrid>
			<ReferenceField label="Holder" source="holder" reference="users">
				<TextField source="name" label="Holder" />
			</ReferenceField>
			<ReferenceField label="Issuer" source="issuer" reference="users">
				<TextField source="name" label="Issuer" />
			</ReferenceField>
			<TextField label="Status" source="status" />
			<ShowButton label="" />
		</Datagrid>
	</List>
);

// @ts-ignore
export const PassShow = (props) => (
	<Show {...props} title="Holly">
		<SimpleShowLayout>
			<ReferenceField label="Holder" source="holder" reference="users">
				<TextField source="name" label="Holder" />
			</ReferenceField>
			<ReferenceField label="Issuer" source="issuer" reference="users">
				<TextField source="name" label="Issuer" />
			</ReferenceField>
			<TextField label="Status" source="status" />
			<TextField label="End Time" source="revoked_at" />
			<TextField label="Abort Time" source="aborted_at" />
		</SimpleShowLayout>
	</Show>
);
