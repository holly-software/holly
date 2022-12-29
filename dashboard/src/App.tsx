import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Error from "./routes/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
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
