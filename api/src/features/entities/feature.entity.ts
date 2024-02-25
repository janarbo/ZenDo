import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.features)
  project: Project;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({default: "To Do"})
  status: string;

}
