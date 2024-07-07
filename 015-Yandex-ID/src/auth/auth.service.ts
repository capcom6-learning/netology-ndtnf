import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Require_id } from 'mongoose';
import { User, UserDocument } from './auth.models';
import { JwtPayload, SignupRequestDto, UserDto } from './auth.dto';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async signup(user: UserDto, password: string): Promise<UserDto> {
        const existing = await this.userModel.findOne({ email: user.email });
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const created = new this.userModel({ ...user, passwordHash: await argon2.hash(password) });
        await created.save();

        return new UserDto({ ...created.toObject(), accessToken: await this.makeJwt(created) });
    }

    async signin(email: string, password: string): Promise<UserDto> {
        const existing = await this.userModel.findOne({ email });
        if (!existing) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (!await argon2.verify(existing.passwordHash, password)) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return new UserDto({ ...existing.toObject(), accessToken: await this.makeJwt(existing) });
    }

    protected async makeJwt(user: UserDocument): Promise<string> {
        const payload = new JwtPayload({ ...user, id: user._id.toString() });

        return await this.jwtService.signAsync(Object.assign({}, payload));
    }
}
