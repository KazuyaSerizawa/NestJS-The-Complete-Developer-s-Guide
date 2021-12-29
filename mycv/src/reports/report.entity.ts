import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  nake: string;
  @Column()
  year: string;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  mileage: number;
}
