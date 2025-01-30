import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'kael2810',
    database: 'postgres',
    autoLoadEntities: true, // Carrega as entidades automaticamente
    synchronize: true, // Sincroniza o banco de dados com as entidades. Não usar em produção
  }), RecadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
