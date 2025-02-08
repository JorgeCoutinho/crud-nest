import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { NotFoundError } from 'rxjs';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  // private lastId = 1;
  // private recados: Recado[] = [
  //   {
  //     id: 1,
  //     texto: 'Olá, tudo bem?',
  //     de: 'Eu',
  //     para: 'Você',
  //     lido: false,
  //     data: new Date(),
  //   },
  // ];

  async findAll(paginationDto: PaginationDto = { limit: 10, offset: 0 }) {
    const { limit = 10, offset = 0 } = paginationDto;

    const recados = await this.recadoRepository.find({
      take: limit, // quantos registros serão retornados
      skip: offset, // quantos registros serão pulados
      relations: ['de', 'para'],
      order: {
        id: 'DESC',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      order: {
        id: 'DESC',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;
    //throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado');
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    // Encontrar a pessoa que está criando o recado
    const de = await this.pessoasService.findOne(deId);
    // Encontrar a pessoa para quem o recado está sendo enviado
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para,
    };
  }

  async update(id: number, UpdateRecadoDto: UpdateRecadoDto) {
    
    const recado = await this.findOne(id);

    recado.texto = UpdateRecadoDto?.texto ?? recado.texto;
    recado.lido = UpdateRecadoDto?.lido ?? recado.lido;
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
