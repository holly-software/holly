import App from "./App.svelte";

import "./styles/global.scss";
import "./styles/reset.scss";
import "@fontsource/noto-sans";

const app = new App({
	target: document.getElementById("app"),
});

export default app;
