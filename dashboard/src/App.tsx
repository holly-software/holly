import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Error from "./routes/error";
import People from "./routes/people";
import { Login, logoutLoader } from "./routes/auth";
import Passes from "./routes/passes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		loader: rootLoader,
		children: [
			{
				path: "people",
				element: <People />,
			},
			{
				path: "passes",
				element: <Passes />,
			},
		],
	},
	{
		path: "/auth",
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "logout",
				loader: logoutLoader,
			},
		],
	},
]);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
