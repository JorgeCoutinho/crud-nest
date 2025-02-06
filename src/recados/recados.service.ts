import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Olá, tudo bem?',
      de: 'Eu',
      para: 'Você',
      lido: false,
      data: new Date(),
    },
  ];

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });

    if (recado) return recado;
    //throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado');
  }

  async create(CreateRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...CreateRecadoDto,
      lido: false,
      data: new Date(),
    };
    const recado = await this.recadoRepository.create(novoRecado);
    return this.recadoRepository.save(recado);
  }

  async update(id: number, UpdateRecadoDto: UpdateRecadoDto) {
    const partialUpadateRecadoDto = {
      lido: UpdateRecadoDto?.lido,
      texto: UpdateRecadoDto?.texto,
    };

    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpadateRecadoDto,
    });

    if (!recado) return new NotFoundException('Recado não encontrado');

    return this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findBy({
      id,
    });

    if (!recado) return new NotFoundException('Recado não encontrado');

    return this.recadoRepository.remove(recado);
  }
}
