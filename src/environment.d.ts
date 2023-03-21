declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_KEY: string;
			API: string;
			NODE_ENV: 'development' | 'production' | 'local';
			PORT?: string;
			PWD: string;
		}
	}
}