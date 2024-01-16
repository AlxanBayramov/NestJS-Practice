import { IsNotEmpty, IsNumberString } from "class-validator"

export class createCustomerDto {
    @IsNotEmpty()
    name: string
    @IsNumberString()
    @IsNotEmpty()
    id: number
}