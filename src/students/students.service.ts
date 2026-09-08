import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import type { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StudentsService {
  async create(createStudentDto: CreateStudentDto, supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from('students')
      .insert(this.toDb(createStudentDto))
      .select();
    if (error) throw new InternalServerErrorException(error.message);
    return {
      data: this.toApi(data[0]),
      message: 'Student created successfully',
    };
  }

  async findAll(supabase: SupabaseClient) {
    const { data, error } = await supabase.from('students').select('*');
    if (error) throw new InternalServerErrorException(error.message);
    return { data: data.map(this.toApi), message: 'Students found successfully' };
  }

  async findOne(id: number, supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    if (!data) throw new NotFoundException('Student not found');
    return { data: this.toApi(data), message: 'Student found successfully' };
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
    supabase: SupabaseClient,
  ) {
    const { data, error } = await supabase
      .from('students')
      .update(this.toDb(updateStudentDto))
      .eq('id', id)
      .select();
    if (error) throw new InternalServerErrorException(error.message);
    if(!data || data.length === 0) throw new NotFoundException('Student not found');
    return {
      data: this.toApi(data[0]),
      message: 'Student updated successfully',
    };
  }

  async remove(id: number, supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
      .select();
      if (error) throw new InternalServerErrorException(error.message);
      if (!data || data.length === 0) throw new NotFoundException('Student not found');
    
    return {
      data: this.toApi(data[0]),
      message: 'Student removed successfully',
    };
  }

  private toApi(row: any) {
    return {
      id: row.id,
      nombre: row.nombre,
      email: row.email,
      telefono: row.telefono,
      fechaNacimiento: row.fecha_nacimiento,
      cursoId: row.curso_id,
      estado: row.estado,
      fechaInscripcion: row.fecha_inscripcion,
      avatar: row.avatar,
    };
  }
  private toDb(dto: CreateStudentDto | UpdateStudentDto) {
    return {
      nombre: dto.nombre,
      email: dto.email,
      telefono: dto.telefono,
      fecha_nacimiento: dto.fechaNacimiento,
      curso_id: dto.cursoId,
      estado: dto.estado,
      fecha_inscripcion: dto.fechaInscripcion,
      avatar: dto.avatar,
    };
  }
}
