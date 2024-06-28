import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-yandex";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";


@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService
    ) {
        super({
            clientID: configService.get<string>('YANDEX_CLIENT_ID'),
            clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET'),
            callbackURL: configService.get<string>('YANDEX_CALLBACK_URL'),
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<Profile> {
        return profile;
    }
}