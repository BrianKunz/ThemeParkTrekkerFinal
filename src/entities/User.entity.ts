import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Trip } from "./Trip.entity";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ default: false })
  admin?: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips?: Trip[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
