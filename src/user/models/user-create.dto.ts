import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
    @IsString({message: "Fullname must be a String"})
    @IsNotEmpty({ message: 'Fullname is required' })
    fullname: string;

    @IsString({message: "Username must be a String"})
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsString({message: "Email must be a String"})
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    // @IsNotEmpty({ message: 'Role is required' })
    // role_id: number;
}