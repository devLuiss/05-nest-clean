import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation failed",
          statusCode: 400,
          errors: fromZodError(error),
        });
      }
      throw new BadRequestException("Validation failed");
    }
    return value;
  }
}

// o pipe ZodValidationPipe) recebe um esquema Zod externo através do construtor para validar os dados de entrada.
//  Se a validação falhar, lança uma exceção BadRequestException com detalhes do erro.
