import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, ValidationPipe, Res, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import sanitizeHtml from 'sanitize-html';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
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

export class ProjectDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;


}

export class FeatureDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  userId: number;
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
  @Get('user-projects')
  getUserProjects(@Request() req) {
     return this.authService.getUserProjects(req.user.sub);

  }


  @UseGuards(AuthGuard)
  @Get('project/:id')
  getProject(@Param('id') id: number, @Request() req) {
     console.log("params", id);
     return this.authService.getProject(req.user.sub, id)

  }

  @UseGuards(AuthGuard)
  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Post('create-feature')
  createFeature(@Body() featureDto: FeatureDto, @Request() req) {
    return this.authService.createFeature(
      featureDto.name,
      featureDto.description,
      featureDto.projectId,
      req.user.sub)
  }

}
