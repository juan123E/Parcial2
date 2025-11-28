import { IsString, MinLength } from "class-validator";

export class CreateTokenDto {
    @IsString()
    @MinLength(1)
    token: string;
}