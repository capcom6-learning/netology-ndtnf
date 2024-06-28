import { Body, Controller, Get, HttpCode, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { SigninRequestDto, SigninRequestSchema, SignupRequestDto, SignupRequestSchema, UserDto } from './auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { YandexGuard } from './yandex.guard';

@Controller('users')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('signup')
    @HttpCode(201)
    @UsePipes(new ValidationPipe(SignupRequestSchema))
    async signup(@Body() request: SignupRequestDto) {
        const user = await this.authService.signup(new UserDto(request), request.password);

        return user;
    }

    @Post('signin')
    @UsePipes(new ValidationPipe(SigninRequestSchema))
    async signin(@Body() request: SigninRequestDto) {
        return await this.authService.signin(
            request.email,
            request.password
        );
    }

    @Get('yandex')
    @UseGuards(YandexGuard)
    async yandex(@Request() req) {
        return req.user;
    }
}
