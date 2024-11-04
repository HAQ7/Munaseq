// src/event/event.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dtos';
import { JoinEventDto } from './dtos/join-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  createEvent(
    createEventDto: CreateEventDto,
    eventCreatorId: string,
    imageUrl: any,
  ) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        imageUrl,
        eventCreatorId,
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
    imageUrl?: any,
  ) {
    return imageUrl
      ? this.prisma.event.update({
          where: { id, eventCreatorId },
          data: { ...updateEventDto, imageUrl },
        })
      : this.prisma.event.update({
          where: { id, eventCreatorId },
          data: updateEventDto,
        });
  }

  remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  findAllCurrentUserEvents(eventCreatorId: string) {
    return this.prisma.event.findMany({
      where: {
        eventCreatorId,
      },
    });
  }

  async joinEvent(userId: string, joinEventDto: JoinEventDto){
    const { eventId } = joinEventDto;
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { joinedUsers: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Fetch the user to get their gender
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { gender: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check gender compatibility
    const isGenderCompatible = user.gender == event.gender || event.gender == 'BOTH';
    if (!isGenderCompatible) {
      throw new BadRequestException('User gender does not match the event\'s accepted gender');
    }

    const isAlreadyJoined = event.joinedUsers.some(user => user.id === userId);
    if (isAlreadyJoined) {
      throw new BadRequestException('User already joined this event');
    }

    if (event.seatCapacity !== null && event.seatCapacity > 0) {
      const joinedCount = event.joinedUsers.length;
      if (joinedCount >= event.seatCapacity) {
        throw new BadRequestException('Event has reached its seat capacity');
      }
    }

    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        joinedUsers: {
          connect: { id: userId },
        },
      },
    });
  }
}
