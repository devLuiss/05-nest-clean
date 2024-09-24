import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env";
import { z } from "zod";

const tokenSchema = z.object({
  sub: z.string().uuid(),
});

type TokenPayload = z.infer<typeof tokenSchema>;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<Env, true>) {
    const secret = configService.get("JWT_SECRET", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      algorithms: ["HS256"],
    });
  }

  async validate(payload: TokenPayload) {
    return tokenSchema.parse(payload);
  }
}
