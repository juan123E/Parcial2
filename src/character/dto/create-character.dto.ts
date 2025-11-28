import { IsBoolean, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    salary: number;
    
    @IsBoolean()
    employee: boolean;
}