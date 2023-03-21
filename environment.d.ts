declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'local'
		PUBLIC_URL: string,
		API: string
	}
}