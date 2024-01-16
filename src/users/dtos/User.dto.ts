import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createUserDto{

    @IsNotEmpty()
    @IsString()
    username : string
    @IsString()
    displayName? : string
}

export class updateUserDto{
    @IsString()
    @IsOptional()
    username: string
    @IsString()
    @IsOptional()
    displayName? : string
    @IsOptional()
    avatarUrl?: string
}