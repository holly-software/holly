import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "net.pps.grantpass",
	appName: "Grant Pass",
	webDir: "dist",
	bundledWebRuntime: false,
	plugins: {
		FirebaseAuthentication: {
			skipNativeAuth: false,
			providers: ["google.com"],
		},
	},
};

export default config;
