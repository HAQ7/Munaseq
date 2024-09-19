// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dtos/update-event.dto';
import { UpdateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  createEvent(createEventDto: CreateEventDto, eventCreatorId: number) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        eventCreatorId,
      },
    });
  }

  findAllUserEvents(eventCreatorId: number) {
    return this.prisma.event.findMany({
      where: {
        eventCreatorId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  updateEvent(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
