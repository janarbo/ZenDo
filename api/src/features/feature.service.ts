import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeaturesService {
    constructor(
        @InjectRepository(Feature)
        private featuresRepository: Repository<Feature>

    ){}

    async getProjectFeatures(id: number) {
        return await this.featuresRepository.find({ where: { project: {id}}  })
    }

    async createFeature(name: string, description: string, projectId: number) {
        return await this.featuresRepository.save({
            name,
            description,
            project: {
                id: projectId,
            },
        });
        return await this.getProjectFeatures(projectId)
    }

}
