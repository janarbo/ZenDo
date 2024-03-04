import { Project } from 'src/projects/entities/project.entity';
import { UserStory } from 'src/userStories/entities/userStory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.features)
  project: Project;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => UserStory, (userStory) => userStory.feature)
  userStories: UserStory[];

}
