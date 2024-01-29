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

  async getHello(): Promise<string> {
    const response = await this.usersRepository.save({name: 'Jane Doe'});
    console.log(response);
    return 'Hello World!';
  }
}
