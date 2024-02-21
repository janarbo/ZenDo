import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, ValidationPipe, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import sanitizeHtml from 'sanitize-html';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';


type signInDto = {
    username: string;
    password: string;
}

export class AccountDetailDto  {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  value: string;


}

export class Email {
  @IsEmail(undefined, {message: 'Please enter a valid email address!'})
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}

export class NewPasswordDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newPassword: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  token: string;
}




@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  getUserData(@Request() req) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfileData(req.user.sub)
  }


  @Post('reset-password')
  resetPassword(@Body() body: Email) {
    return this.authService.sendResetPasswordEmail(body.email);
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
    return this.authService.changeAccountDetails(accountDetailDto);
  }

  @Post('save-new-password')
  saveNewPassword(@Body() body: NewPasswordDto) {
    return this.authService.saveNewPassword(
      body.newPassword,
      body.id,
      body.token,
      );
  }

  @UseGuards(AuthGuard)
  @Post('delete-user')
  deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user.sub)

  }

  @UseGuards(AuthGuard)
  @Get('user-project')
  getUserProjects(@Request() req) {
    return this.authService.getProjectData(req.user.username)
  }

}
