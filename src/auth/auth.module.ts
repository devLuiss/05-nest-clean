import { JwtStrategy } from "@/auth/jwt.strategy";
import { Env } from "@/env";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

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
