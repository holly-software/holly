import App from "./App.svelte";

import "./styles/global.scss";
import "./styles/reset.scss";

import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

const app = new App({
	target: document.getElementById("app"),
});

export default app;
