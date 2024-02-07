import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
