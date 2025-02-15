import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value
        }

        const parsedValue = Number(value)

        // Verifica se o valor é um número
        if (isNaN(parsedValue)) {
            throw new BadRequestException(
                'ParseIntIdPipe espera uma string numérica'
            )
        }

        // Verifica se o valor é menor ou igual a zero
        if (parsedValue <= 0) {
            throw new BadRequestException(
                'ParseIntIdPipe espera um número positivo'
            )
        }


        
        // Retorna o valor transformado
        return parsedValue
    }
}