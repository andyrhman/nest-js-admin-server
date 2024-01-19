import { IsNotEmpty, IsEmail, Length, IsString } from "class-validator";
import { IsEqualTo } from "../decorator/check-password.decorator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString({ message: 'Full name must be a string' })
    fullname: string;

    @IsString()
    @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, undefined, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Confirm password is required' })
    @IsEqualTo('password', { message: 'Password Confirm must be the same as password' })
    confirm_password: string;
}