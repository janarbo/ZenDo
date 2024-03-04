import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>

    ) { }

    addStatusesToProject(project: Project){
        project.features.forEach((feature) => {
            feature["userStoryCount"] = feature.userStories.length;
            feature["completedUserStories"] = 0;

            let featureStarted = false;

            const userStories = feature.userStories;
            userStories.forEach((story) => {
                story['taskCount'] = story.tasks.length;
                const inProgressTasks = story.tasks.filter(
                    (task) => task.status === "In Progress",
                    ).length;
                const completedTasks = story.tasks.filter(
                    (task) => task.status === "Done!",
                    ).length;
                story["completedTasks"]= completedTasks;

                if(completedTasks > 0 || inProgressTasks > 0) {
                    featureStarted = true;
                }

                if (story["taskCount"] === completedTasks && story["taskCount"] > 0)  {
                    feature["completedUserStories"]++;
                }
            });

            if(!featureStarted){
                feature["status"] = "To Do";
            } else if (
               feature["userStoryCount"] === feature['completedUserStories']
            ) {
                feature["status"] = "Done!";
            } else {
                feature["status"] = "In Progress";
            }
        });
        return project;
    }


    async createProject(name: string, description: string, userId: number) {
        await this.projectsRepository.save({
            name,
            description,
            user: {
                id: userId,
            },
        });
        return await this.getUserProjects(userId)
    }


    async getUserProjects(id: number) {
        const projects = await this.projectsRepository.find({
            where: { user: { id } },
            order: {
                id: "ASC",
                features: {
                    id: "ASC",
                    userStories: {
                        id: "ASC",
                        tasks: {
                            id: "ASC",
                        }
                    }
                }
            },
            relations: [
                'features',
                'features.userStories',
                'features.userStories.tasks'
            ],
        })
        return projects.map((project) => {
            return this.addStatusesToProject(project);
        })
    }



    async getProjectById(id: number) {
        const project = await this.projectsRepository.findOne({
            where: { id },
            order: {
                features: {
                    id: "ASC",
                    userStories: {
                        id: "ASC",
                        tasks: {
                            id: "ASC",
                        }
                    }
                }
            },
            relations: [
                'features',
                'features.userStories',
                'features.userStories.tasks'
            ],
        })
        return this.addStatusesToProject(project);
    }

}
