import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  texto: string;

  

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  // Muitos recados podem ser enviados por uma pessoa(emissor)
  @ManyToOne(() => Pessoa)
  // Especifica a coluna que armazena a chave estrangeira
  @JoinColumn({ name: 'de' })
  de: String;

  // Muitos recados podem ser enviados por uma pessoa(destinataria)
  @ManyToOne(() => Pessoa)
  // Especifica a coluna que armazena a chave estrangeira
  @JoinColumn({ name: 'para' })
  para: String;

}
