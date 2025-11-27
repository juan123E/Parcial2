import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, 
    IsString, MinLength } from "class-validator";

export class CreateLocationDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    type?: string;

    @IsPositive()
    @IsNumber()
    cost: number;
    
  }
