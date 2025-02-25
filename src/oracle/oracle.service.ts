import { Injectable } from '@nestjs/common';
import { OracleDBService } from 'src/db/db.service';
import * as oracledb from 'oracledb'

@Injectable()
export class OracleService {
    constructor(private readonly oracleDBService: OracleDBService) { }

    async getRegions() {
        let connection;
        let rows = [];
        try {
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                    USCIB_Managed_Pkg.GetRegions(:p_cursor);
                END;`,
                {
                    p_cursor: {
                        type: oracledb.CURSOR,
                        dir: oracledb.BIND_OUT
                    }
                },
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );

            if (result.outBinds && result.outBinds.p_cursor) {
                const cursor = result.outBinds.p_cursor; // The OUT cursor
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

    async insertRegions(p_region: String, p_name: String) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                       sp1(:p_region,:p_name,:p_cursor);
                     END;`, {
                p_region: {
                    val: p_region,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_name: {
                    val: p_name,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cursor: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT
                }
            }, {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }
            );

            await connection.commit();

            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }

    async updateRegions(p_regionID: Number, p_name: String) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                       sp1(:p_regionID,:p_name,:p_cursor);
                     END;`, {
                p_regionID: {
                    val: p_regionID,
                    type: oracledb.DB_TYPE_NUMBER
                },
                p_name: {
                    val: p_name,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cursor: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT
                }
            }, {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            }
            );

            await connection.commit();

            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }
}
