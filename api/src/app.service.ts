import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Other application-wide methods...
}
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class AppService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) { }

//   async getAllNames() {
//     const allNames = await this.usersRepository.find();
//     console.log(allNames);
//     return allNames;
//   }

  // async createName(name) {
  //   await this.usersRepository.save({ name });
  //   const names = this.getAllNames();
  //   return names


  // }
