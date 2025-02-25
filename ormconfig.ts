import { DataSourceOptions } from 'typeorm';

export const OracleConfig: any = {
    type: 'oracle',
    username: 'system',
    password: 'root',
    connectString: '192.168.1.96/xe',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize: true,
    autoCommit: true
  };
  
  export const MssqlConfig: DataSourceOptions = {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'mssql1433',
    password: 'root',
    database: 'demo',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };
  
  export const MysqlConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'demo',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };