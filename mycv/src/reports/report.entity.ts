import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  approved: boolean;
  @Column()
  price: number;
  @Column()
  make: string;
  @Column()
  year: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  mileage: number;
}
