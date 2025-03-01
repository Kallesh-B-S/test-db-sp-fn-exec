import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

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

// export class GetSelectedServiceProviderDTO {
//     @IsNumber()
//     p_spid: number;
// }

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

export class UpdateServiceProviderDTO {
    @IsNumber()
    p_spid: number;

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

// export class GetSPcontactsDTO {
//     @IsNumber()
//     p_SPid: number;
// }

export class InsertSPContactsDTO {
    @IsNumber()
    p_spid: number;

    @IsString()
    p_defcontactflag: string;

    @IsString()
    p_firstname: string;

    @IsString()
    p_lastname: string;

    @IsString()
    p_title: string;

    @IsString()
    p_phoneno: string;

    @IsString()
    p_mobileno: string;

    @IsString()
    p_faxno: string;

    @IsEmail()
    p_emailaddress: string;

    @IsString()
    p_user_id: string;
}

export class UpdateSPContactsDTO {
    @IsNumber()
    p_spcontactid: number;

    @IsString()
    p_firstname: string;

    @IsString()
    p_lastname: string;

    @IsString()
    p_title: string;

    @IsString()
    p_phoneno: string;

    @IsString()
    p_mobileno: string;

    @IsString()
    p_faxno: string;

    @IsEmail()
    p_emailaddress: string;

    @IsString()
    p_user_id: string;
}

export class CreateCarnetSequenceDTO {
    @IsNumber()
    p_spid: number;
    @IsNumber()
    p_regionid: number;
    @IsNumber()
    p_startnumber: number;
    @IsNumber()
    p_endnumber: number;
    @IsString()
    p_carnettype: string
}

export class CreateTableRecordDTO {
    @IsString()
    P_USERID: string;

    @IsString()
    P_TABLEFULLDESC: string
}

export class CreateParamRecordDTO {

    @IsOptional()
    @IsNumber()
    P_SPID?: number;  

    @IsString()
    P_PARAMTYPE: string;  

    @IsString()
    P_PARAMDESC: string;  

    @IsString()
    P_PARAMVALUE: string;  

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE1?: string;  

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE2?: string;  

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE3?: string;  

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE4?: string;  

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE5?: string;  

    @IsNumber()
    P_SORTSEQ: number;  

    @IsString()
    P_USERID: string;  
}


export class UpdateParamRecordDTO {
    @IsOptional()
    @IsNumber()
    P_SPID?: number;

    @IsNumber()
    P_PARAMID: number;

    @IsString()
    P_PARAMDESC: string;

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE1?: string;

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE2?: string;

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE3?: string;

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE4?: string;

    @IsOptional()
    @IsString()
    P_ADDLPARAMVALUE5?: string;

    @IsNumber()
    P_SORTSEQ: number;

    @IsString()
    P_USERID: string;
}