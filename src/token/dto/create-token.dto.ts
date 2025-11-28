import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";

export class CreateTokenDto {
    @IsString()
    @MinLength(1)
    Token: string;

    @IsBoolean()
    Active: boolean;

    @IsPositive()
    @IsNumber()
    reqLeft :number;
}
