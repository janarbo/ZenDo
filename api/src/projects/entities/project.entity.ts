import { User } from 'src/users/entities/user.entity';
import { Feature } from 'src/features/entities/feature.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Feature, (feature) => feature.project)
  features: Feature[]




}
