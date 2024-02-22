import { User } from 'src/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({default: "To Do"})
  status: string;




}
