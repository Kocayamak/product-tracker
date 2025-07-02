import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 2048 })
  url!: string;

  @Column({ type: "varchar", length: 255 })
  selector!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  platform?: string | null;

  @Column({ type: "int", default: 60 })
  interval_minutes!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  last_price?: number | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
