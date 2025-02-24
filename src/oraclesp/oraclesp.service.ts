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
                   sp1(:p_region,:p_name,:p_cursor);
                 END;`, {
                p_region: {
                    val: "03",
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_name: {
                    val: "",
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
            let fres = await result.outBinds.p_cursor.getRows();

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
                   sp1(:p_regionID,:p_name,:p_cursor);
                 END;`, {
                p_regionID: {
                    val: 3,
                    type: oracledb.DB_TYPE_NUMBER
                },
                p_name: {
                    val: 'indu1',
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
            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }

    async insertNewServiceProider(
        p_name: String,
        p_lookupcode: String,
        p_address1: String,
        p_address2: String,
        p_city: String,
        p_state: String,
        p_zip: String,
        p_country: String,
        p_issuingregion: String,
        p_replacementregion: String,
        p_bondsurety: String,
        p_cargopolicyno: String,
        p_cargosurety: String,
        p_user_id: String,
    ) {

        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   USCIB_Managed_Pkg.InsertNewSP(
                    :p_name,
                    :p_lookupcode,
                    :p_address1,
                    :p_address2,
                    :p_city,
                    :p_state,
                    :p_zip,
                    :p_country,
                    :p_issuingregion,
                    :p_replacementregion,
                    :p_bondsurety,
                    :p_cargopolicyno,
                    :p_cargosurety,
                    :p_user_id,
                    :p_cursor);
                 END;`, {
                p_name: {
                    val: p_name,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_lookupcode: {
                    val: p_lookupcode,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_address1: {
                    val: p_address1,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_address2: {
                    val: p_address2,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_city: {
                    val: p_city,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_state: {
                    val: p_state,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_zip: {
                    val: p_zip,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_country: {
                    val: p_country,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_issuingregion: {
                    val: p_issuingregion,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_replacementregion: {
                    val: p_replacementregion,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_bondsurety: {
                    val: p_bondsurety,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cargopolicyno: {
                    val: p_cargopolicyno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cargosurety: {
                    val: p_cargosurety,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_user_id: {
                    val: p_user_id,
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
            let fres = await result.outBinds.res.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }

    }

    async updateServiceProider(
        p_spid: Number,
        p_name: String,
        p_lookupcode: String,
        p_address1: String,
        p_address2: String,
        p_city: String,
        p_state: String,
        p_zip: String,
        p_country: String,
        p_issuingregion: String,
        p_replacementregion: String,
        p_bondsurety: String,
        p_cargopolicyno: String,
        p_cargosurety: String,
        p_user_id: String
    ) {

        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   USCIB_Managed_Pkg.UpdateSP(
                    :p_spid,
                    :p_name,
                    :p_lookupcode,
                    :p_address1,
                    :p_address2,
                    :p_city,
                    :p_state,
                    :p_zip,
                    :p_country,
                    :p_issuingregion,
                    :p_replacementregion,
                    :p_bondsurety,
                    :p_cargopolicyno,
                    :p_cargosurety,
                    :p_user_id,
                    :p_cursor);
                 END;`, {
                p_spid: {
                    val: p_spid,
                    type: oracledb.DB_TYPE_NUMBER
                },
                p_name: {
                    val: p_name,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_lookupcode: {
                    val: p_lookupcode,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_address1: {
                    val: p_address1,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_address2: {
                    val: p_address2,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_city: {
                    val: p_city,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_state: {
                    val: p_state,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_zip: {
                    val: p_zip,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_country: {
                    val: p_country,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_issuingregion: {
                    val: p_issuingregion,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_replacementregion: {
                    val: p_replacementregion,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_bondsurety: {
                    val: p_bondsurety,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cargopolicyno: {
                    val: p_cargopolicyno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_cargosurety: {
                    val: p_cargosurety,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_user_id: {
                    val: p_user_id,
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
            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }

    }

    async getAllServiceproviders() {

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
                   USCIB_Managed_Pkg.GetAllSPs(:p_cursor);
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

    async getSelectedServiceprovider(p_spid: Number) {

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
                    USCIB_Managed_Pkg.GetSPbySPID(:p_spid,:p_cursor);
                END;`,
                {
                    p_spid: {
                        val: p_spid,
                        type: oracledb.DB_TYPE_NUMBER,
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
        } finally {
        }

    }

    async insertSPContacts(
        p_spid: Number,
        p_firstname: String,
        p_lastname: String,
        p_title: String,
        p_phoneno: String,
        p_mobileno: String,
        p_faxno: String,
        p_emailaddress: String,
        p_user_id: String
    ) {

        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   USCIB_Managed_Pkg.InsertSPContacts(
                    :p_spid,
                    :p_firstname,
                    :p_lastname,
                    :p_title,
                    :p_phoneno,
                    :p_mobileno,
                    :p_faxno,
                    :p_emailaddress,
                    :p_user_id,
                    :p_cursor);
                 END;`, {
                p_spid: {
                    val: p_spid,
                    type: oracledb.DB_TYPE_NUMBER
                },
                p_firstname: {
                    val: p_firstname,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_lastname: {
                    val: p_lastname,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_title: {
                    val: p_title,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_phoneno: {
                    val: p_phoneno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_mobileno: {
                    val: p_mobileno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_faxno: {
                    val: p_faxno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_emailaddress: {
                    val: p_emailaddress,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_user_id: {
                    val: p_user_id,
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
            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }

    }

    async updateSPContacts(
        p_spcontactid: Number,
        p_firstname: String,
        p_lastname: String,
        p_title: String,
        p_phoneno: String,
        p_mobileno: String,
        p_faxno: String,
        p_emailaddress: String,
        p_user_id: String,
    ) {

        let connection;
        try {
            // Connect to the Oracle database using oracledb 
            connection = await this.dbService.getDataSource()
            if (!connection) {
                throw new Error('No DB Connected')
            }

            const result = await connection.execute(
                `BEGIN
                   USCIB_Managed_Pkg.UpdateSPContacts(
                    :p_spcontactid,
                    :p_firstname,
                    :p_lastname,
                    :p_title,
                    :p_phoneno,
                    :p_mobileno,
                    :p_faxno,
                    :p_emailaddress,
                    :p_user_id,
                   :p_cursor);
                 END;`, {
                p_spcontactid: {
                    val: p_spcontactid,
                    type: oracledb.DB_TYPE_NUMBER
                },
                p_firstname: {
                    val: p_firstname,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_lastname: {
                    val: p_lastname,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_title: {
                    val: p_title,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_phoneno: {
                    val: p_phoneno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_mobileno: {
                    val: p_mobileno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_faxno: {
                    val: p_faxno,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_emailaddress: {
                    val: p_emailaddress,
                    type: oracledb.DB_TYPE_VARCHAR
                },
                p_user_id: {
                    val: p_user_id,
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
            let fres = await result.outBinds.p_cursor.getRows();

            return fres

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }

    }

    async getSPcontacts(p_SPid: Number) {
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
                   USCIB_Managed_Pkg.GetSPAllContacts( p_SPid,:p_cursor);
                END;`,
                {
                    p_SPid: {
                        val: p_SPid,
                        type: oracledb.DB_TYPE_NUMBER
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
        } finally {
        }


    }

    async setSPDefaultcontact(p_spcontactid: Number) {
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
                   USCIB_Managed_Pkg.SetDefaultContact(:p_spcontactid);
                END;`,
                {
                    p_cursor: {
                        val: p_spcontactid,
                        type: oracledb.DB_TYPE_NUMBER,
                    }
                },
                // {
                //     outFormat: oracledb.OUT_FORMAT_OBJECT
                // }
            );

            // if (result.outBinds && result.outBinds.p_cursor) {
            //     const cursor = result.outBinds.p_cursor; // The OUT cursor
            //     let rowsBatch;

            //     do {
            //         rowsBatch = await cursor.getRows(100); // Fetch 100 rows at a time
            //         rows = rows.concat(rowsBatch); // Append fetched rows to the main array
            //     } while (rowsBatch.length > 0);

            //     console.log('Rows fetched:', rows);

            //     // Close the cursor after you're done
            //     await cursor.close();
            // } else {
            //     throw new Error('No cursor returned from the stored procedure');
            // }

            return 'rows';

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }


    }

    async inactivateSPContact(p_spcontactid: Number) {
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
                   USCIB_Managed_Pkg.InActivateSPContacts(:p_spcontactid);
                END;`,
                {
                    p_cursor: {
                        val: p_spcontactid,
                        type: oracledb.DB_TYPE_NUMBER,
                    }
                },
                // {
                //     outFormat: oracledb.OUT_FORMAT_OBJECT
                // }
            );

            // if (result.outBinds && result.outBinds.p_cursor) {
            //     const cursor = result.outBinds.p_cursor; // The OUT cursor
            //     let rowsBatch;

            //     do {
            //         rowsBatch = await cursor.getRows(100); // Fetch 100 rows at a time
            //         rows = rows.concat(rowsBatch); // Append fetched rows to the main array
            //     } while (rowsBatch.length > 0);

            //     console.log('Rows fetched:', rows);

            //     // Close the cursor after you're done
            //     await cursor.close();
            // } else {
            //     throw new Error('No cursor returned from the stored procedure');
            // }

            return 'rows';

        } catch (err) {
            console.error('Error fetching users: ', err);
            throw new Error('Error fetching users');
        } finally {
        }
    }

    async getSPDefaultcontact(p_SPid: Number) {

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
                   USCIB_Managed_Pkg.GetSPDefaultContacts( p_SPid,:p_cursor);
                END;`,
                {
                    p_SPid: {
                        val: p_SPid,
                        type: oracledb.DB_TYPE_NUMBER
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
        } finally {
        }

    }
    
}
