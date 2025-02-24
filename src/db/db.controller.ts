import { Controller, Get, Param } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('db')
export class DbController {
    constructor(private readonly dbService: DbService) { }

    @Get('/getConn/:type')
    async getConn(@Param('type') type: string) {
        try {
            const dataSource = this.dbService.getDataSource();
            if (dataSource) {
                return 'Connection successfull1';
            }
            else {
                await this.dbService.initialize(this.dbService.getDbTypeConfig(type))
                const conn = this.dbService.getDataSource();
                if(conn){
                    return "Connection successfull2";
                }
                else{
                    throw new Error('Error while connecting to db..!')
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    @Get('/closeConn')
    closeConn() {
        try {
            const dataSource = this.dbService.getDataSource();
            if (dataSource) {
                return this.dbService.closeConnection();
            }
        }
        catch (err) {
            return "No Connection Detected to close";
        }
    }
}
