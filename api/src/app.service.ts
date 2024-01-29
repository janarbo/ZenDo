import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllNames() {
    const allNames = await this.usersRepository.find();
    console.log(allNames);
    return allNames;
  }

  async createName(name) {
    await this.usersRepository.save({name});
    const names = this.getAllNames();
    return names


  }
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
