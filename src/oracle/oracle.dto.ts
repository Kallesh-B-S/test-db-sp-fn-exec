import { IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertRegionsDto {
    @IsString()
    p_region: string;

    @IsString()
    p_name: string;
}

export class UpdateRegionDto {
    @IsNumber()
    p_regionID: number;

    @IsString()
    p_name: string;
}

export class InsertNewServiceProviderDTO {
    @IsString()
    p_name: string;

    @IsString()
    p_lookupcode: string;

    @IsString()
    p_address1: string;

    @IsString()
    p_address2: string;

    @IsString()
    p_city: string;

    @IsString()
    p_state: string;

    @IsString()
    p_zip: string;

    @IsString()
    p_country: string;

    @IsString()
    p_issuingregion: string;

    @IsString()
    p_replacementregion: string;

    @IsString()
    p_bondsurety: string;

    @IsString()
    p_cargopolicyno: string;

    @IsString()
    p_cargosurety: string;

    @IsString()
    p_user_id: string;
}

