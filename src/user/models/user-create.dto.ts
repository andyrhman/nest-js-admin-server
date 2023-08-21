import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}