import { Module } from '@nestjs/common';
import {  UserStoriesService } from './userStories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStory } from './entities/userStory.entity';



@Module({
  imports: [TypeOrmModule.forFeature([UserStory])],
  providers: [UserStoriesService],
  exports: [UserStoriesService],

})
export class UserStoriesModule {}
