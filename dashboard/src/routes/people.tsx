import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { db } from "../utils/firebase";
import type { Typesaurus } from "typesaurus";
import { useRead } from "@typesaurus/react";
import { Container } from "@mui/material";

type Row = {
	id: Typesaurus.Id<"users">;
	name: string;
	role_student: boolean;
	role_teacher: boolean;
	role_admin: boolean;
};

function People() {
	const [users, _] = useRead(db.users.all());

	async function processRowUpdate(newRow: Row): Promise<Row> {
		await db.users.set(newRow.id, {
			name: newRow.name,
			roles: {
				student: newRow.role_student,
				teacher: newRow.role_teacher,
				admin: newRow.role_admin,
			},
		});
		return newRow;
	}

	const columns: GridColDef[] = [
		{
			field: "name",
			type: "string",
			editable: true,
			headerName: "Name",
			flex: 1,
		},
		{
			field: "role_student",
			type: "boolean",
			editable: true,
			headerName: "Student",
		},
		{
			field: "role_teacher",
			type: "boolean",
			editable: true,
			headerName: "Teacher",
		},
		{
			field: "role_admin",
			type: "boolean",
			editable: true,
			headerName: "Admin",
		},
	];

	const rows: Row[] = (users ?? []).map((doc) => ({
		id: doc.ref.id,
		name: doc.data.name,
		role_student: doc.data.roles.student,
		role_teacher: doc.data.roles.teacher,
		role_admin: doc.data.roles.admin,
	}));

	return (
		<Container maxWidth="lg" sx={{ padding: 5 }}>
			<DataGrid
				columns={columns}
				rows={rows}
				experimentalFeatures={{ newEditingApi: true }}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={console.error}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</Container>
	);
}

export default People;
