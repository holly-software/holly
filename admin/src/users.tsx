import {
	Datagrid,
	List,
	Show,
	SimpleShowLayout,
	TextField,
	ShowButton,
	AutocompleteInput,
	ReferenceInput,
} from "react-admin";

// @ts-ignore
const UserFilter = [
	// fixme: clean this up
	<ReferenceInput source="name" alwaysOn reference="users">
		<AutocompleteInput optionText="name" />
	</ReferenceInput>,
];

// @ts-ignore
export const UserList = (props) => (
	<List {...props} filters={UserFilter}>
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
