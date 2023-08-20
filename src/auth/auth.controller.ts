import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    BadRequestException, 
    NotFoundException, 
    Res, 
    Req, 
    UseInterceptors, 
    ClassSerializerInterceptor, 
    UseGuards 
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import * as Joi from 'joi';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Res() response: Response
    ) {
        if (body.password !== body.confirm_password) {
            throw new BadRequestException("Password do not match.")
        }

        // Check if the username or email already exists
        const existingUser = await this.userService.findByUsernameOrEmail(
            body.username,
            body.email,
        );

        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
        }

        // Hash Password
        const hashPassword = await argon2.hash(body.password);

        response.status(200);
        return this.userService.create({
            username: body.username,
            email: body.email,
            password: hashPassword
        });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({ email });

        if (!user) {
            throw new NotFoundException("Email or Password is invalid");
        }

        if (!await argon2.verify(user.password, password)) {
            throw new BadRequestException("Email or Password is invalid")
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });
        response.status(200);

        return user;
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Get('user')
    async user(
        @Req() request: Request,
        @Res({passthrough: true}) response: Response
    ){
        //Finding jwt in the cookies
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        response.status(200);
        return this.userService.findOne({id: data['id']});
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res({passthrough: true}) response: Response
    ){
        response.clearCookie('jwt');

        return {
            message: "success"
        }
    }
}
