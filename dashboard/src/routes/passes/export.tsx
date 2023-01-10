import { Pass } from "@holly/schema";
import {
	Box,
	Button,
	ButtonGroup,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { useRead } from "@typesaurus/react";
import { useState } from "react";
import { ActionFunctionArgs, Form, useActionData } from "react-router-dom";
import { Typesaurus } from "typesaurus";
import { useAssumedAuth } from "../../utils/auth-context";
import { CSV, Table } from "../../utils/export";
import { db } from "../../utils/firebase";

function ExportPasses() {
	const auth = useAssumedAuth();
	const isAdmin = auth.document.data.roles.admin;

	const [issuers, _] = useRead(
		db.users.query(($) => [$.field("roles", "teacher").equal(true)])
	);

	const exportedTable = useActionData() as Table | undefined;

	const [mode, setMode] = useState("revoked");
	const [issuer, setIssuer] = useState(isAdmin ? "all" : auth.document.ref.id);

	const [loading, setLoading] = useState(false);

	return (
		<Container maxWidth="xs" sx={{ padding: 5 }}>
			<Typography component="h1" variant="h4" mb={1}>
				Export Passes
			</Typography>

			<Typography component="p" variant="body1" mb={4}>
				We're still working on displaying passes in the dashboard. In the
				meantime, you can export passes to a CSV file and view them in your
				spreadsheet software of choice.
			</Typography>

			<Form replace method="post">
				<Stack spacing={3}>
					<FormControl fullWidth>
						<InputLabel id="mode-select-label">Mode</InputLabel>
						<Select
							name="mode"
							value={mode}
							onChange={(e) => setMode(e.target.value)}
							id="mode-select"
							labelId="mode-select-label"
							label="Mode"
						>
							<MenuItem value="revoked">Complete Only</MenuItem>
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="active">Active Only</MenuItem>
							<MenuItem value="aborted">Canceled Only</MenuItem>
						</Select>
					</FormControl>

					<FormControl>
						<InputLabel id="issuer-select-label">Teacher</InputLabel>
						<Select
							name="issuer"
							value={issuer}
							onChange={(e) => setIssuer(e.target.value)}
							id="issuer-select"
							labelId="issuer-select-label"
							label="Teacher"
						>
							{isAdmin && <MenuItem value="all">All</MenuItem>}

							<MenuItem value={auth.document.ref.id}>
								{auth.document.data.name}
							</MenuItem>

							{isAdmin &&
								(issuers ?? [])
									.filter(
										(issuerDoc) => issuerDoc.ref.id !== auth.document.ref.id
									)
									.map((issuerDoc) => (
										<MenuItem key={issuerDoc.ref.id} value={issuerDoc.ref.id}>
											{issuerDoc.data.name}
										</MenuItem>
									))}
						</Select>
					</FormControl>

					<Button
						type="submit"
						onClick={() => setLoading(true)}
						variant="outlined"
						fullWidth
					>
						Export
					</Button>
				</Stack>
			</Form>

			<Box mt={2}>
				{(exportedTable && (
					<>
						<Typography component="h2" variant="h6" mb={1}>
							Download
						</Typography>
						<Typography mb={2}>
							Exported {exportedTable.rows.length - 1} passes.
						</Typography>
						<ButtonGroup variant="outlined" fullWidth>
							<Button
								component="a"
								href={exportedTable.serialize(CSV).asURL()}
								download="passes.holly.csv"
							>
								CSV
							</Button>
						</ButtonGroup>
					</>
				)) ||
					(loading && <Typography>Loading...</Typography>)}
			</Box>
		</Container>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const mode = formData.get("mode")?.toString() ?? "revoked";
	const issuer = formData.get("issuer")?.toString() ?? "all";

	const [users, passes] = await Promise.all([
		db.users.all(),
		db.passes.query(($) => {
			const query = [];

			switch (mode) {
				case "all":
					break;
				case "revoked":
					query.push($.field("status").equal("revoked"));
					break;
				case "active":
					query.push($.field("status").equal("issued"));
					break;
				case "aborted":
					query.push($.field("status").equal("aborted"));
					break;
			}

			switch (issuer) {
				case "all":
					break;
				default:
					query.push($.field("issuer").equal(db.users.id(issuer)));
					break;
			}

			return query;
		}),
	]);

	const names = new Map(users.map((user) => [user.ref.id, user.data.name]));

	const extract = (pass: Typesaurus.Doc<Pass, "passes">) => ({
		status: pass.data.status,
		holder: names.get(pass.data.holder) ?? "Ghost",
		issuer: names.get(pass.data.issuer) ?? "Ghost",
		reason: pass.data.reason,
		requested_at: pass.data.requested_at?.toISOString() ?? "",
		aborted_at:
			(
				pass.data as Extract<Pass, { status: "aborted" }>
			).aborted_at?.toISOString() ?? "",
		issued_at:
			(
				pass.data as Extract<Pass, { status: "issued" }>
			).issued_at?.toISOString() ?? "",
		revoked_at:
			(
				pass.data as Extract<Pass, { status: "revoked" }>
			).revoked_at?.toISOString() ?? "",
	});

	switch (mode) {
		case "all":
			return Table.build(passes, {
				columns: [
					"status",
					"holder",
					"issuer",
					"reason",
					"requested_at",
					"aborted_at",
					"issued_at",
					"revoked_at",
				],
				extract,
			});
		case "revoked":
			return Table.build(passes, {
				columns: [
					"status",
					"holder",
					"issuer",
					"reason",
					"requested_at",
					"issued_at",
					"revoked_at",
				],
				extract,
			});
		case "active":
			return Table.build(passes, {
				columns: [
					"status",
					"holder",
					"issuer",
					"reason",
					"requested_at",
					"issued_at",
				],
				extract,
			});
		case "aborted":
			return Table.build(passes, {
				columns: [
					"status",
					"holder",
					"issuer",
					"reason",
					"requested_at",
					"aborted_at",
				],
				extract,
			});
	}
}

export default ExportPasses;
