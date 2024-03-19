import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStory } from './entities/userStory.entity';

@Injectable()
export class UserStoriesService {
    constructor(
        @InjectRepository(UserStory)
        private userStoriesRepository: Repository<UserStory>

    ){}

    async getFeatureUserStories(id: number) {
        return await this.userStoriesRepository.find({ where: { feature: {id}},
            relations: ["tasks"] })
    }

    async createUserStory(name: string, description: string, featureId: number) {
        await this.userStoriesRepository.save({
            name,
            description,

            feature: {
                id: featureId,
            },
        });
        return await this.getFeatureUserStories(featureId)
    }

    async getUserStoryStatusById(id: number){
       
        const userStory = await this.userStoriesRepository.findOne({
            where: { id },
            relations: ['tasks'],
        })
        const tasks = userStory.tasks;
        const taskCount = tasks.length;
        const completedTasks = tasks.filter((task) => task.status === "Done!")
        const completedTasksLength = completedTasks.length
        return `${completedTasksLength}/${taskCount}`
    }

}
