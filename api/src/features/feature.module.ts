import { Module } from '@nestjs/common';
import { FeaturesService } from './feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeaturesService],
  exports: [FeaturesService],

})
export class FeaturesModule {}
