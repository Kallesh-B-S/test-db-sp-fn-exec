import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { InsertRegionsDto, UpdateRegionDto } from './oracle.dto';

@Controller('oracle')
export class OracleController {
    constructor(private readonly oarcleService: OracleService) { }

    @Get('/GetRegions')
    getRegions() {
        return this.oarcleService.getRegions();
    }

    @Post('/InsertRegions')
    insertRegions(@Body() body: InsertRegionsDto) {
        return this.oarcleService.insertRegions(body.p_region, body.p_name);
    }

    @Patch('/UpdateRegion')
    updateRegions(@Body() body: UpdateRegionDto) {
        return this.oarcleService.updateRegions(body.p_regionID,body.p_name);
    }
}
