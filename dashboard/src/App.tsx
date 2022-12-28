import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
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
