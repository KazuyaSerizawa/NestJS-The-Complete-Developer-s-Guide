import { Exclude } from "class-transformer";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id`, this.id);
  }
  @AfterUpdate()
  logUddate() {
    console.log("Updated User with id", this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("Removed user with id", this.id);
  }
}
