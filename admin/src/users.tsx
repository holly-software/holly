import {
	Datagrid,
	List,
	Show,
	SimpleShowLayout,
	TextField,
	ShowButton,
	Filter,
	TextInput,
} from "react-admin";

// @ts-ignore
const UserFilter = (props) => (
	<Filter {...props}>
	  <TextInput label="Search" source="name" alwaysOn />
	</Filter>
);

// @ts-ignore
export const UserList = (props) => (
	<List {...props} filters={<UserFilter />}>
		<Datagrid>
			<TextField source="name" />
			<TextField label="Teacher" source="roles.teacher" />
			<TextField label="Admin" source="roles.admin" />
			<ShowButton label="" />
		</Datagrid>
	</List>
);

// @ts-ignore
export const UserShow = (props) => (
	<Show {...props} title="Holly">
		<SimpleShowLayout>
			<TextField source="name" />
			<TextField label="Teacher" source="roles.teacher" />
			<TextField label="Admin" source="roles.admin" />
		</SimpleShowLayout>
	</Show>
);
