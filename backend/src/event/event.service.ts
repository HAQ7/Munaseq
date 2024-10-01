// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

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

  getAllEvents() {
    return this.prisma.event.findMany(
      {
        where: {
          isPublic: true,
        },
      },
    );
  }

  // this function needs availabilty attribute from the event table
//   getById(id: number, userID: number) {
//     const availablitity = this.prisma.event.findUnique({
//         where: { id },
//         data: {
//             availabilty: 
//         });
//   }

  updateEvent(
    eventCreatorId: number,
    id: number,
    updateEventDto: UpdateEventDto,
  ) {
    return this.prisma.event.update({
      where: { id, eventCreatorId },
      data: updateEventDto,
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  findAllCurrentUserEvents(eventCreatorId: number) {
    const currentDate = new Date();
    return this.prisma.event.findMany({
      where: {
        eventCreatorId,
        startDateTime: {
          lte: currentDate, // Event has started
        },
        endDateTime: {
          gte: currentDate, // Event has not ended
        },
      },
    });
  }
}
