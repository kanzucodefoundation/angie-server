import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from '../appointments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from '../entities/appointments.entity';



@ApiTags('Appointments')
@Controller('api/appointment/appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentService: AppointmentService,
      
  ) {
  }


  @Get()
  index(): Promise<Appointments[]> {
    return this.appointmentService.findAll();
  }

  @Post()
  async create(@Body() data: Appointments): Promise<Appointments> {
    return this.appointmentService.create(data);
  }
}
