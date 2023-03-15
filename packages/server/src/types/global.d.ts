declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number
    DB_PROD_URI: string
    DB_DEV_URI: string
    ENV: 'test' | 'dev' | 'prod'
  }
}
