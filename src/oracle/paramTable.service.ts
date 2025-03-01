import { Injectable } from '@nestjs/common';
import { OracleDBService } from 'src/db/db.service';
import * as oracledb from 'oracledb'
import { UpdateParamRecordDTO } from './oracle.dto';

@Injectable()
export class ParamTableService {
    constructor(private readonly oracleDBService: OracleDBService) { }

    async GETPARAMVALUES(P_SPID?: number | null, P_PARAMTYPE?: string | null) {
        P_SPID = P_SPID ? P_SPID : null;
        P_PARAMTYPE = P_PARAMTYPE ? P_PARAMTYPE : null;
        let connection;
        let rows = [];
        try {
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                    MANAGEPARAMTABLE_PKG.GETPARAMVALUES(:P_SPID,:P_PARAMTYPE,:p_cursor);
                END;`,
                {
                    P_SPID: {
                        val: P_SPID,
                        type: oracledb.DB_TYPE_NVARCHAR
                    },
                    P_PARAMTYPE: {
                        val: P_PARAMTYPE,
                        type: oracledb.DB_TYPE_NVARCHAR
                    },
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
        } finally { }

    }

    async CREATETABLERECORD(P_USERID: string, P_TABLEFULLDESC: string) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN 
                    MANAGEPARAMTABLE_PKG.CREATETABLERECORD(:P_USERID,:P_TABLEFULLDESC,:p_cursor); 
                END;`,
                {
                    P_TABLEFULLDESC: {
                        val: P_TABLEFULLDESC,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_USERID: {
                        val: P_USERID,
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
        } finally { }
    }

    async CREATEPARAMRECORD(
        P_PARAMTYPE: string,
        P_PARAMDESC: string,
        P_PARAMVALUE: string,
        P_SORTSEQ: number,
        P_USERID: string,
        P_SPID?: number,
        P_ADDLPARAMVALUE1?: string,
        P_ADDLPARAMVALUE2?: string,
        P_ADDLPARAMVALUE3?: string,
        P_ADDLPARAMVALUE4?: string,
        P_ADDLPARAMVALUE5?: string,
    ) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN 
                    MANAGEPARAMTABLE_PKG.CREATEPARAMRECORD(
                    :P_SPID,
                    :P_PARAMTYPE,
                    :P_PARAMDESC,
                    :P_PARAMVALUE,
                    :P_ADDLPARAMVALUE1,
                    :P_ADDLPARAMVALUE2,
                    :P_ADDLPARAMVALUE3,
                    :P_ADDLPARAMVALUE4,
                    :P_ADDLPARAMVALUE5,
                    :P_SORTSEQ,
                    :P_USERID,
                    :p_cursor); 
                END;`,
                {
                    P_SPID: {
                        val: P_SPID,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_PARAMTYPE: {
                        val: P_PARAMTYPE,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_PARAMDESC: {
                        val: P_PARAMDESC,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_PARAMVALUE: {
                        val: P_PARAMVALUE,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE1: {
                        val: P_ADDLPARAMVALUE1,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE2: {
                        val: P_ADDLPARAMVALUE2,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE3: {
                        val: P_ADDLPARAMVALUE3,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE4: {
                        val: P_ADDLPARAMVALUE4,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE5: {
                        val: P_ADDLPARAMVALUE5,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_SORTSEQ: {
                        val: P_SORTSEQ,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_USERID: {
                        val: P_USERID,
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
        } finally { }
    }

    async UPDATEPARAMRECORD(body: UpdateParamRecordDTO) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN 
                   MANAGEPARAMTABLE_PKG.UPDATEPARAMRECORD(
                    :P_SPID,
                    :P_PARAMID,
                    :P_PARAMDESC,
                    :P_ADDLPARAMVALUE1,
                    :P_ADDLPARAMVALUE2,
                    :P_ADDLPARAMVALUE3,
                    :P_ADDLPARAMVALUE4,
                    :P_ADDLPARAMVALUE5,
                    :P_SORTSEQ,
                    :P_USERID,
                    :p_cursor); 
                END;`,
                {
                    P_SPID: {
                        val: body.P_SPID,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_PARAMID: {
                        val: body.P_PARAMID,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_PARAMDESC: {
                        val: body.P_PARAMDESC,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE1: {
                        val: body.P_ADDLPARAMVALUE1,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE2: {
                        val: body.P_ADDLPARAMVALUE2,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE3: {
                        val: body.P_ADDLPARAMVALUE3,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE4: {
                        val: body.P_ADDLPARAMVALUE4,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_ADDLPARAMVALUE5: {
                        val: body.P_ADDLPARAMVALUE5,
                        type: oracledb.DB_TYPE_VARCHAR
                    },
                    P_SORTSEQ: {
                        val: body.P_SORTSEQ,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_USERID: {
                        val: body.P_USERID,
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
        } finally { }
    }

    async INACTIVATEPARAMRECORD(P_PARAMID: number, P_USERID: string) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN 
                   MANAGEPARAMTABLE_PKG.INACTIVATEPARAMRECORD(
                    :P_PARAMID,
                    :P_USERID,
                    :p_cursor); 
                END;`,
                {
                    P_PARAMID: {
                        val: P_PARAMID,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_USERID: {
                        val: P_USERID,
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
        } finally { }
    }

    async REACTIVATEPARAMRECORD(P_PARAMID: number, P_USERID: string) {
        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.oracleDBService.getConnection()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN 
                   MANAGEPARAMTABLE_PKG.REACTIVATEPARAMRECORD(
                    :P_PARAMID,
                    :P_USERID,
                    :p_cursor); 
                END;`,
                {
                    P_PARAMID: {
                        val: P_PARAMID,
                        type: oracledb.DB_TYPE_NUMBER
                    },
                    P_USERID: {
                        val: P_USERID,
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
        } finally { }
    }
}