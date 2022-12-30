import { Container } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { db } from "../firebase";
import { useRead } from "@typesaurus/react";
import type { Pass } from "@holly/schema";
import type { Typesaurus } from "typesaurus";

type Row = {
	id: Typesaurus.Id<"passes">;
	status: Pass["status"];

	holder_name: string;
	reason: string;

	requested_at: Date | null;
};

function Passes() {
	const [passes, _] = useRead(db.passes.all());

	const columns: GridColDef[] = [
		{
			field: "status",
			type: "string",
			headerName: "Status",
		},
		{
			field: "holder_name",
			type: "string",
			headerName: "Holder",
            flex: 1,
		},
		{
			field: "reason",
			type: "string",
			headerName: "Reason",
		},
		{
			field: "requested_at",
			type: "datetime",
			headerName: "Requested",
            flex: 2,
		},
	];

	const rows: Row[] = (passes ?? []).map((doc) => ({
		id: doc.ref.id,
		status: doc.data.status,
		holder_name: doc.data.holder_name,
		reason: doc.data.reason,
		requested_at: doc.data.requested_at,
	}));

	return (
		<Container maxWidth="lg" sx={{ padding: 5 }}>
			<DataGrid
				columns={columns}
				rows={rows}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</Container>
	);
}

export default Passes;
