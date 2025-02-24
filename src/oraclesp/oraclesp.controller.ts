import { Controller,Get } from '@nestjs/common';
import { OracleSpService } from './oraclesp.service';

@Controller('oracleSP')
export class OracleSpController {
    constructor(private readonly oracleSPService:OracleSpService){}

    @Get('/getRegions')
    getRegions(){
        return this.oracleSPService.getRegions();
    }
}
