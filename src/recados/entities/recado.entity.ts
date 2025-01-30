import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',   length: 100 })
  texto: string;

  @Column({ type: 'varchar',   length: 100 })
  de: string;

  @Column({ type: 'varchar',   length: 100 })
  para: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}