import { Stack, Button, Typography } from "@mui/material";
import { useRouteError, Link as RouterLink } from "react-router-dom";

function Error() {
	const error = useRouteError();
	console.error(error);

	return (
		<Stack alignItems="center" justifyContent="center" height="100vh">
			{error?.status === 404 ? (
				<>
					<Typography component="h1" variant="h1">
						Not Found
					</Typography>
					<Typography>The page you requested does not exist.</Typography>
					<Button
						component={RouterLink}
						to="/"
						variant="outlined"
						sx={{ marginTop: 2 }}
					>
						Return Home
					</Button>
				</>
			) : (
				<>
					<Typography component="h1" variant="h1">
						Oops!
					</Typography>
					<Typography>An unexpected error ocurred.</Typography>
				</>
			)}
		</Stack>
	);
}

export default Error;
