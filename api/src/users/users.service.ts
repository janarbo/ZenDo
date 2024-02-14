import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from '../entities/user.entity';

@Injectable()
export class UsersService {
  users: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } });

  }

  async findUserByUsername(username:string) {
    return await this.userRepository.findOne({ where: { username }} );
  }
  
  async findUserByEmail(email:string) {
    return await this.userRepository.findOne({ where: { email }} );
  }

  async findUserByUserID(id:number) {
    return await this.userRepository.findOne({ where: { id }} );
  }

}
