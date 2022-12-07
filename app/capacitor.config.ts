import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.maxniederman.holly",
	appName: "Holly",
	webDir: "dist",
	bundledWebRuntime: false,
	plugins: {
		FirebaseAuthentication: {
			skipNativeAuth: false,
			providers: ["google.com"],
		},
	},
	server: {
		allowNavigation: ["*"],
	},
};

export default config;
