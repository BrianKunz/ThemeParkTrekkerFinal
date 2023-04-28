import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  description: string;

  @Column()
  created: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user?: User | null;
  constructor(
    title: string,
    image: string | undefined,
    description: string,
    created: Date,
    user: User | null // make user nullable
  ) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.created = created;
    this.user = user;
  }

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
