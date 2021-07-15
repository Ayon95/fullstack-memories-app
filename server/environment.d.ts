declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		MONGO_URL: string;
		SECRET: string;
		GOOGLE_OAUTH_CLIENT_ID: string;
	}
}
