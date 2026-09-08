import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { SupabaseCtx, withSupabase } from '@supabase/server/adapters/nestjs'
import type { SupabaseClient } from '@supabase/supabase-js';


@Controller('students')
@UseGuards(withSupabase({auth: 'none'}))
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  findAll(@SupabaseCtx('supabaseAdmin') supabase: SupabaseClient){
    return this.studentsService.findAll(supabase)
  }

  @Post()
  create(@SupabaseCtx('supabaseAdmin') supabase: SupabaseClient, @Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto, supabase);
  }

  @Get(':id')
  findOne(@SupabaseCtx('supabaseAdmin') supabase: SupabaseClient, @Param('id') id: string) {
    return this.studentsService.findOne(+id, supabase);
  }

  @Patch(':id')
  update(@SupabaseCtx('supabaseAdmin') supabase: SupabaseClient, @Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto, supabase);
  }

  @Delete(':id')
  remove(@SupabaseCtx('supabaseAdmin') supabase: SupabaseClient, @Param('id') id: string) {
    return this.studentsService.remove(+id, supabase);
  }
}
