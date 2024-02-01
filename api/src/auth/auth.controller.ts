import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, ValidationPipe, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Post('logout')
  // logout(@Res() res: Response): void {
  //   const success = this.authService.logout();
  //   if (success) {
  //    res.status(HttpStatus.OK).json({});
  //   } else {
  //   res.sendStatus(HttpStatus.BAD_REQUEST); // Set status and send an empty response
  //   }
  // }

}
