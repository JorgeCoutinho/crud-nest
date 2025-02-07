import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  readonly texto: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(100)
  // readonly de: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(100)
  // readonly para: string;
}
