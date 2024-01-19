import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';
import { IsEqualTo } from '../decorator/check-password.decorator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString({ message: 'Full name must be a string' })
    fullname: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, undefined, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEqualTo('password', { message: 'Password Confirm must be the same as password' })
    confirm_password: string;
}