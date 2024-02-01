import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(createUserDto.name);
    if (existingUser) {
      throw new ConflictException('User with this name already exists');
    }

    const newUser = await this.usersService.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    const accessToken = this.jwtService.sign({
      name: newUser.name,
      sub: newUser.id,
    });

    return { access_token: accessToken };
  }


  async signIn(name: string, password: string): Promise<{access_token: string}> {
    const user = await this.usersService.findOne(name);

    if (user?.password !== password) {
        throw new UnauthorizedException();
      }

    const payload = { name: user.name, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  // logout(): boolean {
  //   return true;
  // }
}
