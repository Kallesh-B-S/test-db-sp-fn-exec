import { MssqlConfig , OracleConfig} from 'ormconfig';
import { createPool, Pool, Connection as cob, } from 'oracledb';
import { Connection, ConnectionPool } from 'mssql';

export class OracleDBService {
    private pool: Pool;

    constructor() {
        this.initializePool();
    }

    private async initializePool() {
        this.pool = await createPool({
            ...OracleConfig,
            poolMin: 1,
            poolMax: 10,
            poolIncrement: 1,
        });
    }

    async getConnection(): Promise<cob> {
        const connection = await this.pool.getConnection();
        console.log('Database connection initialized successfully for oracle.');
        return connection;
    }
}

export class MssqlDBService {
    private pool: ConnectionPool;
    private readonly config = {
        ...MssqlConfig,
        server: "localhost",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
    };

    constructor() {
        this.initializePool();
    }

    private async initializePool() {
        this.pool = new ConnectionPool(this.config);
    }

    async getConnection(): Promise<Connection> {
        try {
            const connection = await this.pool.connect();
            console.log('Database connection initialized successfully for Mssql.');
            // console.log(`Connection established to server: ${this.config.server}`); // Log server info
            return connection;
        } catch (error) {
            console.error('Error getting connection from pool', error.stack);
            throw error; // Rethrow the error after logging
        }
    }
}