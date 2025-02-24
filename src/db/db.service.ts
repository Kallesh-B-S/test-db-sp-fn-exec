import { Injectable } from '@nestjs/common';
import { MssqlConfig, MysqlConfig, OracleConfig } from 'ormconfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as oracledb from 'oracledb';

@Injectable()
export class DbService {
    private dataSource: DataSource | null = null;
    private oracleConnection: oracledb.Connection | null = null;

    constructor() {}

    async initialize(options: DataSourceOptions) {
        if (options.type === 'oracle') {
            this.oracleConnection = await oracledb.getConnection(options);
        } else {
            this.dataSource = new DataSource({
                ...options,
            });
            await this.dataSource.initialize();
            console.log('Data Source has been initialized!');
        }
    }

    getDataSource(): DataSource | oracledb.Connection | null {
        if (this.oracleConnection) {
            return this.oracleConnection; // Return the Oracle connection
        }
        return this.dataSource; // Return the TypeORM DataSource
    }

    getDbTypeConfig(type?: string): DataSourceOptions {
        if (type === 'oracle') return OracleConfig;
        else return MssqlConfig;
    }

    async closeConnection() {
        if (this.oracleConnection) {
            try {
                await this.oracleConnection.close(); // Close Oracle connection
                console.log('Oracle connection has been closed!');
            } catch (err) {
                console.error('Error closing Oracle connection:', err);
            }
            this.oracleConnection = null;
        } else if (this.dataSource) {
            await this.dataSource.destroy();
            console.log('Data Source has been closed!');
            this.dataSource = null;
        } else {
            console.log('Data Source is not initialized.');
        }
    }
}