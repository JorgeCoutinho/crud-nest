import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { NotFoundError } from 'rxjs';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class RecadosService {

    constructor(
        @InjectRepository(Recado)
        private readonly recadoRepository: Repository<Recado>
    ) {}

    private lastId = 1;
    private recados: Recado[] = [
        {
            id: 1,
            texto: 'Olá, tudo bem?',
            de: 'Eu',
            para: 'Você',
            lido: false,
            data: new Date()
        }
    ];


    async findAll() {
        const recados = await this.recadoRepository.find();
        return recados;
    }

    async findOne(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { 
                id,
             }
        });

        if (recado) return recado;
        //throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
        throw new NotFoundException('Recado não encontrado');
    }

    create(CreateRecadoDto: CreateRecadoDto) {
        this.lastId++;

        const id = this.lastId;
        const novoRecado = {
            id,
            ...CreateRecadoDto,
            lido: false,
            data: new Date()
        }
        this.recados.push(novoRecado);

        return novoRecado;
    }

    update(id: string, UpdateRecadoDto: UpdateRecadoDto) {
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );

        // se não encontrar o recado
        if (recadoExistenteIndex < 0) {
            throw new NotFoundException('Recado não encontrado');
        }

        if (recadoExistenteIndex >= 0) {
            const recadoExistente = this.recados[recadoExistenteIndex];

            this.recados[recadoExistenteIndex] = {
                ...recadoExistente,
                ...UpdateRecadoDto,
            };
        }

        return this.recados[recadoExistenteIndex];
    }

    remove(id: number) {
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === id
        );

        // se não encontrar o recado
        if (recadoExistenteIndex < 0) {
            throw new NotFoundException('Recado não encontrado');
        }


        const recado = this.recados[recadoExistenteIndex];
        if (recadoExistenteIndex >= 0) {
            this.recados.splice(recadoExistenteIndex, 1);
        }

        return recado;
    }

}
