import { Controller, Get, Query, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const fetchRecentQuestionsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().min(1)),
});

type FetchRecentQuestionsQuery = z.infer<
  typeof fetchRecentQuestionsQuerySchema
>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(fetchRecentQuestionsQuerySchema))
  async handle(
    @Query(new ZodValidationPipe(fetchRecentQuestionsQuerySchema))
    query: FetchRecentQuestionsQuery
  ) {
    const perPage = 10;
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: perPage,
      skip: query.page > 1 ? (query.page - 1) * perPage : 0,
    });
    return {
      questions,
    };
  }
}
