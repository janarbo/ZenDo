import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { AccountDetailDto, ProjectDto } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { ProjectsService } from 'src/projects/project.service';
import { FeaturesService } from 'src/features/feature.service';

@Injectable()
export class AuthService {
  constructor(
    private featuresService: FeaturesService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,

  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async createAccessToken(user: User, secret?:string) {
    const payload = { sub:user.id}
    if (secret) {
      return await this.jwtService.signAsync(payload,
        {secret: user.password,
          expiresIn: "10m",
        });
    } else {
      return await this.jwtService.signAsync(payload);
    }
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
    throw new UnauthorizedException('Invalid credentials');
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

  async getProfileData(id: number) {

    const user = await this.usersService.findUserByUserID(id);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    }
  }

  async sendResetPasswordEmail(email) {
    const user = await this.usersService.findUserByEmail(email);
    if (user == null) {
      throw new UnauthorizedException('email does not exist');
    }
    const token = await this.createAccessToken(user, user.password);
    return await this.mailService.sendPasswordResetEmail(user, token);


  }

  async saveNewPassword(newPassword: string, id: number, token: string) {
    const user = await this.usersService.findUserByUserID(id)
    await this.jwtService.verifyAsync(token, {
      secret: user.password,
    }).catch((error)=>{
      console.log("ERROR", error);
      throw new UnauthorizedException;
    }).then(async ()=> {
      const hashedPassword = await this.hashPassword(newPassword);
      user.password = hashedPassword;
      return await this.usersService.create(user);
    });
  }

 async changeAccountDetails(accountDetailDto: AccountDetailDto) {
  const user = await this.usersService.findUserByUsername(
    accountDetailDto.username,
  )

  if (accountDetailDto.field === 'password') {
    const plainTextPassword = accountDetailDto.value;
    const hashedPassword = await this.hashPassword(plainTextPassword);
    user[accountDetailDto.field] = hashedPassword;
  } else {
    user[accountDetailDto.field] = accountDetailDto.value;
  }
  const updatedUser = await this.usersService.create(user);
  return {
    name: updatedUser.name,
    email: updatedUser.email,
    username: updatedUser.username,
  };
 }

 async deleteUser(id: number) {
  return await this.usersService.deleteUser(id);
 }

 async createProject(name: string, description: string, userId: number){
  return await this.projectsService.createProject(name, description, userId);
 }

 async getUserProjects(userId: number) {
   const user = await this.getProfileData(userId);
   const projects = await this.projectsService.getUserProjects(userId);

   return {
    user,
    projects,
   };
 }

 async getProject(userId: number, id: number) {
  const projects = await this.projectsService.getUserProjects(userId)
  return projects.filter((project) => project.id === id);
 }

 async createFeature(name: string, description: string, projectId: number, userId: number ){
  console.log("Name", name)
  console.log("Description", description)
  console.log("PROJECTID", projectId)
  console.log("UserId", userId)
  const projects = await this.projectsService.getUserProjects(userId);
  const project = projects.find((project) => project.id === projectId);

  if(project.id) {
    return await this.featuresService.createFeature(
      name,
      description,
      projectId,
    );

  } else {
    throw new UnauthorizedException("project not found")
  }


 }



}
