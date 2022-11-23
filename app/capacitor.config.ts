import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.maxniederman.grantpass",
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
