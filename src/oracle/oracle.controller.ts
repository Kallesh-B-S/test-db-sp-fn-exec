import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { GetSelectedServiceProviderDTO, GetSPcontactsDTO, InsertNewServiceProviderDTO, InsertRegionsDto, InsertSPContactsDTO, UpdateRegionDto, UpdateServiceProviderDTO } from './oracle.dto';

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

    @Get('/GetSelectedServiceprovider')
    getSelectedServiceprovider(@Body() body: GetSelectedServiceProviderDTO) {
        return this.oarcleService.getSelectedServiceprovider(body.p_spid);
    }

    @Post('/InsertNewServiceProvider')
    insertNewServiceProvider(@Body() body: InsertNewServiceProviderDTO) {
        return this.oarcleService.insertNewServiceProvider(
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

    @Put('/UpdateServiceProvider')
    updateServiceProider(@Body() body: UpdateServiceProviderDTO) {
        return this.oarcleService.updateServiceProvider(
            body.p_spid,
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

    @Get('/GetSPcontacts')
    getSPcontacts(@Body() body: GetSPcontactsDTO) {
        return this.oarcleService.getSPcontacts(body.p_SPid);
    }

    @Post('InsertSPContacts')
    insertSPContacts(@Body() body: InsertSPContactsDTO){
        return this.oarcleService.insertSPContacts(
            body.p_spid,
            body.p_firstname,
            body.p_lastname,
            body.p_title,
            body.p_phoneno,
            body.p_mobileno,
            body.p_faxno,
            body.p_emailaddress,
            body.p_user_id
        )
    }
}
