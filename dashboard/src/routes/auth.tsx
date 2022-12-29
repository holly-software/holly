import { Google as GoogleIcon } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebase";

export function Login() {
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	async function handleLogin() {
		await signInWithGoogle();
		navigate(from, { replace: true });
	}

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			height="100vh"
			spacing={4}
		>
			<Typography component="h1" variant="h1">
				Holly
			</Typography>
			<Button
				startIcon={<GoogleIcon />}
				variant="outlined"
				onClick={handleLogin}
			>
				Log in with Google
			</Button>
		</Stack>
	);
}

export async function logoutLoader() {
	await signOut();
	return redirect("../login");
}
