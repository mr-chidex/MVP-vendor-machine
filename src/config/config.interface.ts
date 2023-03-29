export enum DBType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
}

export interface DB {
  type: DBType;
  DB_HOSTNAME: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DB_NAME: string;
  synchronize: boolean;
}
