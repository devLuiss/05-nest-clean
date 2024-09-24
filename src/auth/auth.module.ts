import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { Env } from "src/env";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(configService: ConfigService<Env, true>) {
        const secret = configService.get("JWT_SECRET", { infer: true });
        return {
          secret,
          signOptions: {
            algorithm: "HS256",
            expiresIn: "5d",
          },
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
