import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  flight?: string;

  @ManyToOne(() => User, (user) => user.trips)
  user?: string | User;
}
