import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async signIn(username: string, password: string) {
  const user = await this.usersService.findUserByUsername(username);
  if (user !== null) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
  }
  const payload = { sub: user.id, username: user.username };
  return {
    access_token: await this.jwtService.signAsync(payload),
   };
  } else {
    console.log('user does not exist');
   }
 }



  async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('User name already exists');
    }

    const newUser = await this.usersService.create({
      name: createUserDto.name,
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.sign({
      name: newUser.name,
      sub: newUser.id,
    });

    return { access_token: accessToken };
  }

  async getProfileData(username: string) {

    const user = await this.usersService.findUserByUsername(username);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    }
  }

  async resetPassword(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user == null) {
      throw new UnauthorizedException('email does not exist');
    }
    const payload = { sub: user.id,  username:user.username };
    const token = await this.jwtService.signAsync(payload,  {
      secret : `${user.password} - ${user.created_at}`
    });
    return token;

  }

  async saveNewPassword(newPassword, token, id) {
    const user = await this.usersService.findUserByUserID(id);
    const secret = `${user.password} - ${user.created_at}`


  }

}
