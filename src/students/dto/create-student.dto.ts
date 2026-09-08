import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
@IsString()
    nombre: string;

@IsString()
    email: string;

@IsNumber()
    telefono: number;

@IsDateString()
    fechaNacimiento: string;

@IsNumber()
    cursoId: number;

@IsIn(['activo', 'inactivo'])
    estado: 'activo' | 'inactivo';

@IsDateString()
    fechaInscripcion: string;

@IsString()
    avatar: string;
}
