import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from 'src/auth/auth.controller';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>

    ){}

    async getUserProjects(id: number) {
        return await this.projectsRepository.find({ where: { user: {id}}  })
    }

    async createProject(name: string, description: string, userId: number) {
        return await this.projectsRepository.save({
            name,
            description,
            user: {
                id: userId,
            },
        });
        return await this.getUserProjects(userId)
    }

}
