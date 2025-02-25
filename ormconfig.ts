import { DataSourceOptions } from 'typeorm';

export const OracleConfig: any = {
    // type: 'oracle',
    user: 'Carnetsys',
    password: 'Carnet1234',
    connectString: '172.31.18.76/xe',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize: true,
    // autoCommit: true
  };
  
  export const MssqlConfig: any = {
    // type: 'mssql',
    host: '172.31.18.76',
    // port: 1433,
    user: 'Carnetsys',
    password: 'Carnet1234',
    database: 'CarnetDB',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize: true,
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