import { Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import * as oracledb from 'oracledb'

@Injectable()
export class OracleSpService {
    private dbService: DbService;

    constructor(@Inject(DbService) dbService: DbService) {
        this.dbService = dbService;
    }

    async getRegions() {
        let connection;
        let rows = [];
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                    sp1(:res);
                END;`,
                {
                    res: {
                        type: oracledb.CURSOR,
                        dir: oracledb.BIND_OUT
                    }
                },
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );

            if (result.outBinds && result.outBinds.res) {
                const cursor = result.outBinds.res; // The OUT cursor
                let rowsBatch;

                do {
                    rowsBatch = await cursor.getRows(100); // Fetch 100 rows at a time
                    rows = rows.concat(rowsBatch); // Append fetched rows to the main array
                } while (rowsBatch.length > 0);

                console.log('Rows fetched:', rows);

                // Close the cursor after you're done
                await cursor.close();
            } else {
                throw new Error('No cursor returned from the stored procedure');
            }

            return rows;

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }

    async InsertRegions() {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   sp1(:a,:b,:res);
                 END;`, {
                a: {
                    val: "03",
                    type: oracledb.DB_TYPE_VARCHAR
                },
                b: {
                    val: 'indu1',
                    type: oracledb.DB_TYPE_VARCHAR
                },
                res: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT
                }
            }, {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }
            );
            let fres = await result.outBinds.res.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }

    async updateRegions() {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   sp1(:a,:b,:res);
                 END;`, {
                a: {
                    val: 3,
                    type: oracledb.DB_TYPE_NUMBER
                },
                b: {
                    val: 'indu1',
                    type: oracledb.DB_TYPE_VARCHAR
                },
                res: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT
                }
            }, {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }
            );
            let fres = await result.outBinds.res.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }
}
