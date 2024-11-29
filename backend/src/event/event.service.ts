import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, JoinEventDto, UpdateEventDto } from './dtos';
import { title } from 'process';

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
  //-----------------------------------------------------------------------------------------------------------------
  //THE FOLLOWING ARE SEARCH METHODS

  //pageSize indicate how many number records the user wants to retreive
  //pageNumber is help the user to indicate how many records will be skipped. The following variable will calculate the number of skipped records
  // const skipedRecords = (pageNumber - 1) * pageSize;  if the pageNumber =1 (i.e. the user want the first element) then the skipped records will equal 0*5(default pageSize) = 0

  getAllEvents(title?: string, pageNumber: number = 1, pageSize: number = 5) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          isPublic: true,
          title: {
            contains: title,
          },
        },

        take: pageSize,
        skip: skipedRecords,
      });
    } else {
      return this.prisma.event.findMany({
        where: {
          isPublic: true,
        },
        take: pageSize,
        skip: skipedRecords,
      });
    }
  }
  findAllCurrentUserEvents(
    eventCreatorId: string,
    title?: string,
    pageNumber: number = 1,
    pageSize: number = 5,
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          eventCreatorId,
          title: {
            contains: title,
          },
        },
        take: pageSize,
        skip: skipedRecords,
      });
    } else {
      return this.prisma.event.findMany({
        where: {
          eventCreatorId,
        },
        take: pageSize,
        skip: skipedRecords,
      });
    }
  }

  getById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
  findJoinedEvents(
    userId,
    title?: string,
    pageNumber: number = 1,
    pageSize: number = 5,
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          joinedUsers: {
            some: {
              id: userId,
            },
          },
          title: {
            contains: title,
          },
        },
        take: pageSize,
        skip: skipedRecords,
      });
    } else {
      return this.prisma.event.findMany({
        where: {
          joinedUsers: {
            some: {
              id: userId,
            },
          },
        },
        take: pageSize,
        skip: skipedRecords,
      });
    }
  }
  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

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

  async joinEvent(userId: string, joinEventDto: JoinEventDto) {
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
    const isGenderCompatible =
      user.gender == event.gender || event.gender == 'BOTH';
    if (!isGenderCompatible) {
      throw new BadRequestException(
        "User gender does not match the event's accepted gender",
      );
    }

    const isAlreadyJoined = event.joinedUsers.some(
      (user) => user.id === userId,
    );
    if (isAlreadyJoined) {
      throw new BadRequestException('User already joined this event');
    }

    if (event.seatCapacity !== null && event.seatCapacity > 0) {
      const joinedCount = event.joinedUsers.length;
      if (joinedCount >= event.seatCapacity) {
        throw new BadRequestException('Event has reached its seat capacity');
      }
    }
    // LOGICAL ERROR: The creator, moderator, and presenter of event can join the event as attendees
    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        joinedUsers: {
          connect: { id: userId },
        },
      },
    });
  }

  async leaveEvent(userId: string, eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { joinedUsers: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const isUserJoined = event.joinedUsers.some((user) => user.id === userId);
    if (!isUserJoined) {
      throw new BadRequestException('User is not joined to this event');
    }

    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        joinedUsers: {
          disconnect: { id: userId },
        },
      },
    });
  }
}
