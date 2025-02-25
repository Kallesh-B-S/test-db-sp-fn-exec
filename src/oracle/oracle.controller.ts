import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { InsertNewServiceProviderDTO, InsertRegionsDto, UpdateRegionDto } from './oracle.dto';

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
        return this.oarcleService.updateRegions(body.p_regionID, body.p_name);
    }

    @Get('GetAllServiceproviders')
    getAllServiceproviders() {
        return this.oarcleService.getAllServiceproviders();
    }

    @Post('/InsertNewServiceProvider')
    insertNewServiceProvider(@Body() body: InsertNewServiceProviderDTO) {
        return this.oarcleService.insertNewServiceProider(
            body.p_name,
            body.p_lookupcode,
            body.p_address1,
            body.p_address2,
            body.p_city,
            body.p_state,
            body.p_zip,
            body.p_country,
            body.p_issuingregion,
            body.p_replacementregion,
            body.p_bondsurety,
            body.p_cargopolicyno,
            body.p_cargosurety,
            body.p_user_id
        )
    }
}
