import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// CRUD
    // Create -> POST -> Criar um recado
    // Read -> GET -> Ler todos os recados
    // Read -> GET -> Ler apenas um recado
    // Update -> PATCH / PUT -> Atualizar um recado
    // Delete -> DELETE -> Apagar um recado

    // PATCH é utilizado para atualizar dados de um recurso
    // PUT é utilizado para atualizar um recurso inteiro

    // DTO - Data Transfer Object -> Objeto de transferência de dados
    // DTO -> Objeto simples -> Validar dados / Transformar dados 

@Controller('recados')
export class RecadosController {
    constructor(private recadosService: RecadosService) {}

    

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(@Query() pagination: any) {
        const { limit = 10, offset = 0 } = pagination;
        // return `Essa rota retorna todos os recados. Limit: ${limit} e Offset: ${offset}`;
        const recados = await this.recadosService.findAll();
        return recados;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.findOne(id);
    }

    @Post()
    create(@Body() CreateRecadoDto: CreateRecadoDto) {
        return  this.recadosService.create(CreateRecadoDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateRecadoDto: UpdateRecadoDto) {
        return this.recadosService.update(id, UpdateRecadoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.remove(id);
    }
}