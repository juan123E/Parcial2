import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";

export class CreateCharacterDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsPositive()
    @IsNumber()
    salary: number;
    
    @IsBoolean()
    employee: boolean;

    @IsString()
    property: string;
    
    @IsString({each: true})
    @IsArray()
    favPlaces: string[];


}