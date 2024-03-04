import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>

    ) { }

    async getUserStoryTasks(id: number) {
        return await this.tasksRepository.find({ where: { userStory: { id } } })
    }

    async createTask(name: string, userStoryId: number) {
        await this.tasksRepository.save({
            name,
            userStory: {
                id: userStoryId,
            },
        });
        return await this.getUserStoryTasks(userStoryId)
    }

}
