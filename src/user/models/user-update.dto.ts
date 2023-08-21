import { IsNotEmpty, IsEmail } from "class-validator";

export class UserUpdateDto {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}