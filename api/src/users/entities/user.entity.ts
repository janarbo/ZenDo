import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  photo: string;
  created_at: any;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]

}
