// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dtos';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  createEvent(
    createEventDto: CreateEventDto,
    eventCreatorId: string,
    image?: Express.Multer.File,
  ) {
    const imageUrl: string = image
      ? `http://localhost:3002/images/${image.filename}`
      : null;
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        imageUrl,
        eventCreatorId: eventCreatorId,
      },
    });
  }

  getAllEvents() {
    return this.prisma.event.findMany({
      where: {
        isPublic: true,
      },
    });
  }

  getById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
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
    eventCreatorId: string,
    id: string,
    updateEventDto: UpdateEventDto,
    image?: Express.Multer.File,
  ) {
    const imageUrl: string = image
      ? `http://localhost:3002/images/${image.filename}`
      : null;
    if (image) {
      return this.prisma.event.update({
        where: { id, eventCreatorId },
        data: { ...updateEventDto, imageUrl },
      });
    } else {
      return this.prisma.event.update({
        where: { id, eventCreatorId },
        data: updateEventDto,
      });
    }
  }

  remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  findAllCurrentUserEvents(eventCreatorId: string) {
    return this.prisma.event.findMany({
      where: {
        eventCreatorId: eventCreatorId,
      },
    });
  }
}
