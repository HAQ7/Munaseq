import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, JoinEventDto, UpdateEventDto } from './dtos';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}
  //----------------------------------------------------------------------
  //THE FOLLOWING IS CREATING EVENT LOGIC
  //----------------------------------------------------------------------
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
  //--------------------------------------------------
  //THE FOLLOWING IS FOR UPDATING/REMOVING AN EVENT LOGIC
  //--------------------------------------------------
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

  //----------------------------------------------------------------------
  //THE FOLLOWING ARE SEARCH METHODS
  //----------------------------------------------------------------------

  //pageSize indicate how many number records the user wants to retreive
  //pageNumber is help the user to indicate how many records will be skipped. The following variable will calculate the number of skipped records
  // const skipedRecords = (pageNumber - 1) * pageSize;  if the pageNumber =1 (i.e. the user want the first element) then the skipped records will equal 0*5(default pageSize) = 0

  getAllEvents(
    title?: string,
    pageNumber: number = 1,
    pageSize: number = 5,
    execludedEvents?: string[],
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          id: {
            notIn: execludedEvents,
          },
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
          id: {
            notIn: execludedEvents,
          },
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
    execludedEvents?: string[],
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          id: { notIn: execludedEvents },
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
          id: { notIn: execludedEvents },
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
  //Returns the joined events for certain user
  findJoinedEvents(
    userId,
    title?: string, //
    pageNumber: number = 1,
    pageSize: number = 5,
    execludedEvents?: string[],
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (title) {
      return this.prisma.event.findMany({
        where: {
          id: {
            notIn: execludedEvents,
          },
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
          id: {
            notIn: execludedEvents,
          },
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
  //Return all users that have the specified role in certain event
  async findUsersParticipateInEvent(
    eventId: string,
    role: string,
    username?: string, //to enable search by username
    pageNumber: number = 1,
    pageSize: number = 5,
    execludedUsers?: string[],
  ) {
    const skipedRecords = (pageNumber - 1) * pageSize;
    if (username) {
      const result = await this.prisma.event.findMany({
        where: {
          id: eventId,
        },
        select: {
          joinedUsers: {
            where: {
              username: {
                contains: username,
              },
              id: {
                notIn: execludedUsers, //enables the client (front-end) to explicitly execlude users
              },
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePictureUrl: true,
              username: true,
            },
            take: pageSize,
            skip: skipedRecords,
          },
        },
      });
      return result.length > 0 ? result[0][role] : []; // to return array contains the selected fields only
    } else {
      const result = await this.prisma.event.findMany({
        where: {
          id: eventId,
        },
        select: {
          [role]: {
            where: {
              id: {
                notIn: execludedUsers,
              },
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePictureUrl: true,
              username: true,
            },
            take: pageSize,
            skip: skipedRecords,
          },
        },
      });
      return result.length > 0 ? result[0][role] : []; // to return array contains the selected fields only
    }
  }

  //--------------------------------------------------
  //THE FOLLOWING IS FOR ADDING/DELETING MATERIAL LOGIC
  //--------------------------------------------------
  async addMaterialsToEvent(
    eventId: string,
    userId: string,
    materials: { materialUrl: string }[],
  ) {
    //the following logic is to ensure that the material will not be added to the event unless the user is authorized to do that

    //retreive eventCreator, moderators, and presenters ids
    const eventIds = await this.prisma.event.findUniqueOrThrow({
      where: { id: eventId },
      select: {
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
      },
    });
    // Check if the userId matches any of the roles
    const isAuthorized =
      eventIds.eventCreatorId === userId ||
      eventIds.presenters.some((presenter) => presenter.id === userId) ||
      eventIds.moderators.some((moderator) => moderator.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }

    // If authorized, proceed to add materials
    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        Materials: {
          createMany: {
            data: materials,
          },
        },
      },
      select: {
        Materials: {
          where: {
            materialUrl: {
              in: materials.map((material) => material.materialUrl), //to retreive the only materials' urls
            },
          },
          select: { materialUrl: true, materialId: true }, //the materialId is send in the response in order to make the front-end team able to send the materialId in order to delete the material
        },
      },
    });
  }

  async deleteMaterial(userId, materialId) {
    //the following logic is to ensure that the material will not be deleted from an event unless the user is authorized to do that

    //retreive eventCreator, moderators, and presenters ids
    const eventIds = await this.prisma.event.findFirstOrThrow({
      where: {
        Materials: {
          some: {
            materialId,
          },
        },
      },
      select: {
        id: true,
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
      },
    });
    // Check if the userId matches any of the roles
    const isAuthorized =
      eventIds.eventCreatorId === userId ||
      eventIds.presenters.some((presenter) => presenter.id === userId) ||
      eventIds.moderators.some((moderator) => moderator.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }
    const result = await this.prisma.event.update({
      where: {
        id: eventIds.id,
      },
      data: {
        Materials: {
          delete: {
            materialId,
          },
        },
      },
    });
    if (result) {
      return {
        message: `The assignment with id "${materialId}" has been deleted successfully`,
      };
    } else {
      throw new InternalServerErrorException(
        "The assignment couldn't be deleted successfully",
      );
    }
  }

  //--------------------------------------------------
  //THE FOLLOWING IS FOR ADDING/UPDATING/DELETING MATERIAL LOGIC
  //--------------------------------------------------
  async addAssignmentToEvent(
    eventId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
    questions?: string,
    materialUrl?: string,
  ) {
    //the following logic is to ensure that the assignment will not be added to the event unless the user is authorized to do that

    //retreive eventCreator, moderators, and presenters ids
    const eventIds = await this.prisma.event.findUniqueOrThrow({
      where: { id: eventId },
      select: {
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
      },
    });
    // Check if the userId matches any of the roles
    const isAuthorized =
      eventIds.eventCreatorId === userId ||
      eventIds.presenters.some((presenter) => presenter.id === userId) ||
      eventIds.moderators.some((moderator) => moderator.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }
    const result = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        Assignments: {
          create: {
            startDate,
            endDate,
            materialUrl,
            questions,
          },
        },
      },
      select: {
        Assignments: {
          where: {
            materialUrl: {
              equals: materialUrl,
            },
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            materialUrl: true,
            questions: true,
          },
        },
      },
    });
    return result?.Assignments[0] ?? []; //to remove the unnecessary structure from the response
  }

  async updateAssignment(
    assignementId: string,
    userId: string,
    startDate?: Date,
    endDate?: Date,
    questions?: string,
    materialUrl?: string,
  ) {
    //the following logic is to ensure that the assignment will not be edited unless the user is authorized to do that

    //retreive eventCreator, moderators, ,presenters, and event ids
    const eventIds = await this.prisma.event.findFirstOrThrow({
      //findUnique requires a direct unique attribute for event model, in this case the unique attr. isn't direct
      where: {
        Assignments: {
          some: {
            id: assignementId, // will check for an event that has an assignment id matches assignmentId
          },
        },
      },
      select: {
        id: true,
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
      },
    });
    // Check if the userId matches any of the roles
    const isAuthorized =
      eventIds.eventCreatorId === userId ||
      eventIds.presenters.some((presenter) => presenter.id === userId) ||
      eventIds.moderators.some((moderator) => moderator.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }
    // The following is to append the new data to newData object in order to use it in prisma logic
    let newData: {
      startDate?: Date;
      endDate?: Date;
      questions?: string;
      materialUrl?: string;
    } = {};
    if (startDate) {
      newData = { ...newData, startDate };
    }
    if (endDate) {
      newData = { ...newData, endDate };
    }
    if (questions) {
      newData = { ...newData, questions };
    }
    if (materialUrl) {
      newData = { ...newData, materialUrl };
    }
    const result = await this.prisma.event.update({
      where: {
        id: eventIds.id,
      },
      data: {
        Assignments: {
          update: {
            where: {
              id: assignementId,
            },
            data: { ...newData },
          },
        },
      },
      select: {
        Assignments: {
          where: {
            id: assignementId,
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            materialUrl: true,
            questions: true,
          },
        },
      },
    });
    return result?.Assignments[0] ?? []; //to remove the unnecessary structure from the response
  }
  async deleteAssignment(assignementId: string, userId: string) {
    //the following logic is to ensure that the assignment will not be deleted unless the user is authorized to do that

    //retreive eventCreator, moderators, ,presenters, and event ids
    const eventIds = await this.prisma.event.findFirstOrThrow({
      //findUnique requires a direct unique attribute for event model, in this case the unique attr. isn't direct
      where: {
        Assignments: {
          some: {
            id: assignementId, // will check for an event that has an assignment id matches assignmentId
          },
        },
      },
      select: {
        id: true,
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
      },
    });
    // Check if the userId matches any of the roles
    const isAuthorized =
      eventIds.eventCreatorId === userId ||
      eventIds.presenters.some((presenter) => presenter.id === userId) ||
      eventIds.moderators.some((moderator) => moderator.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }
    const result = await this.prisma.event.update({
      where: {
        id: eventIds.id,
      },
      data: {
        Assignments: {
          delete: {
            id: assignementId,
          },
        },
      },
    });
    if (result) {
      return {
        message: `The assignment with id "${assignementId}" has been deleted successfully`,
      };
    } else {
      throw new InternalServerErrorException(
        "The assignment couldn't be deleted successfully",
      );
    }
  }

  //--------------------------------------------------
  //THE FOLLOWING IS FOR JOINNING/LEAVING AN EVENT LOGIC
  //--------------------------------------------------
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
  //--------------------------------------------------
  //THE FOLLOWING IS FOR RATING AN EVENT LOGIC
  //--------------------------------------------------
  async rateEvent(userId: string, eventId: string, rating: number) {
    //the following logic is to ensure that the rating will not be add to event unless that the user is authorized to do that

    //retreive eventCreator, moderators, ,presenters, and joinedUsers for the given eventId
    const eventIds = await this.prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
      select: {
        eventCreatorId: true,
        presenters: { select: { id: true } },
        moderators: { select: { id: true } },
        joinedUsers: { select: { id: true } },
        GivenFeedbacks: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });
    // Check that the user is not conisdered as neither event creator, moderator, nor presenter, but he is considered as joinedUser (attender)
    const isAuthorized =
      eventIds.eventCreatorId !== userId &&
      eventIds.presenters.every((presenter) => presenter.id !== userId) &&
      eventIds.moderators.every((moderator) => moderator.id !== userId) &&
      eventIds.joinedUsers.some((joinedUser) => joinedUser.id === userId);

    if (!isAuthorized) {
      throw new BadRequestException(
        'User is not authorized to add materials to this event',
      );
    }
    //Check wether the user has already rated an event or not
    const hasRated = eventIds.GivenFeedbacks.some(
      (feedback) => feedback.userId === userId,
    );
    if (!hasRated) {
      const result = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          GivenFeedbacks: {
            create: {
              rating,
              userId, //Creating an event rating and assign it to the user
            },
          },
        },
        select: {
          GivenFeedbacks: {
            select: {
              rating: true,
            },
          },
        },
      });
      const numberOfRatings = result.GivenFeedbacks.length;
      const sumOfRating = result.GivenFeedbacks.reduce(
        (preRatings, currRating) => preRatings + currRating.rating,
        0,
      );
      const avgRating = sumOfRating / numberOfRatings;
      return {
        message: 'The rating has been added successfully',
        avgRating,
        numberOfRatings,
      };
    } else {
      const feedbackId = eventIds.GivenFeedbacks.find(
        (feedback) => feedback.userId === userId,
      ).id;
      const result = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          GivenFeedbacks: {
            update: {
              where: { id: feedbackId },
              data: {
                rating,
              },
            },
          },
        },
        select: {
          GivenFeedbacks: {
            select: {
              rating: true,
            },
          },
        },
      });
      const numberOfRatings = result.GivenFeedbacks.length;
      const sumOfRating = result.GivenFeedbacks.reduce(
        (preRatings, currRating) => preRatings + currRating.rating,
        0,
      );
      const avgRating = sumOfRating / numberOfRatings;
      return {
        message: 'The rating has been updated successfully',
        avgRating,
        numberOfRatings,
      };
    }
  }
  async eventRating(eventId: string) {
    const result = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        GivenFeedbacks: {
          select: {
            rating: true,
          },
        },
      },
    });
    const numberOfRatings = result.GivenFeedbacks.length;
    const sumOfRating = result.GivenFeedbacks.reduce(
      (preRatings, currRating) => preRatings + currRating.rating,
      0,
    );
    const avgRating = sumOfRating / numberOfRatings;
    return {
      avgRating,
      numberOfRatings,
    };
  }
}
