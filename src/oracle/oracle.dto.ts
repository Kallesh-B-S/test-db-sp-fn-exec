import { IsNumber, IsString } from 'class-validator';

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

