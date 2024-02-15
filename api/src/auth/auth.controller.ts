import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, ValidationPipe, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as sanitizeHtml from 'sanitize-html';
import { IsNotEmpty } from 'class-validator';


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
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
    return this.authService.changeAccountDetails(accountDetailDto);
  }
}
//   @Post('save-new-password')
//   saveNewPassword(@Body('')) {
//     return this.authService.saveNewPassword(newPassword, token, id);
//   }

// }


  // @Post('logout')
  // logout(@Res() res: Response): void {
  //   const success = this.authService.logout();
  //   if (success) {
  //    res.status(HttpStatus.OK).json({});
  //   } else {
  //   res.sendStatus(HttpStatus.BAD_REQUEST)
  //   }
  // }
