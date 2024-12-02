// src/event/event.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import {
  CreateAssignment,
  CreateEventDto,
  ExecludeEvents,
  ExecludeUsers,
  JoinEventDto,
  LeaveEventDto,
  SeacrhUser,
  SearchEvent,
  UpdateAssignment,
  UpdateEventDto,
} from './dtos';

import { multerEventLogic, multerMaterialtLogic } from 'src/utils/multer.logic';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // dtos for createEvent and updateEvent will probably need to be updated
  @UseGuards(AuthGuard)
  @UseInterceptors(multerEventLogic())
  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createEventDto: CreateEventDto,
    @GetCurrentUserId() eventCreatorId: string,
    @UploadedFiles()
    files: {
      image?: any;
    },
  ) {
    const imageUrl = files?.image ? files.image[0].location : null; // S3 location of the Image
    return this.eventService.createEvent(
      createEventDto,
      eventCreatorId,
      imageUrl,
    );
  }

  // this should only return events that are public
  @Get()
  getAllEvents(
    @Query() query: SearchEvent,
    @Body() execludedEventsDto?: ExecludeEvents,
  ) {
    const { execludedEvents } = execludedEventsDto;
    return this.eventService.getAllEvents(
      query.title,
      query.pageNumber,
      query.pageSize,
      execludedEvents,
    );
  }
  //Returns all event that've been created by current the user
  @UseGuards(AuthGuard)
  @Get('current')
  findAllCurrentUserEvents(
    @GetCurrentUserId() eventCreatorId: string,
    @Query() query: SearchEvent,
    @Body() execludedEventsDto?: ExecludeEvents,
  ) {
    const { execludedEvents } = execludedEventsDto;
    return this.eventService.findAllCurrentUserEvents(
      eventCreatorId,
      query.title,
      query.pageNumber,
      query.pageSize,
      execludedEvents,
    );
  }
  //Returns all events that the current user has joined
  @UseGuards(AuthGuard)
  @Get('joinedEvents')
  findJoinedEvents(
    @GetCurrentUserId() userId,
    @Query() query: SearchEvent,
    @Body()
    execludedEventsDto?: ExecludeEvents,
  ) {
    const { execludedEvents } = execludedEventsDto;
    return this.eventService.findJoinedEvents(
      userId,
      query.title,
      query.pageNumber,
      query.pageSize,
      execludedEvents,
    );
  }
  //Returns all users that attend in certain event
  @Get('attendeess/:eventId')
  findUsersAttendEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
    @Body() execludedUsersDto?: ExecludeUsers,
  ) {
    const { execludedUsers } = execludedUsersDto;

    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'joinedUsers',
      query.username,
      query.pageNumber,
      query.pageSize,
      execludedUsers,
    );
  }
  //Returns all users that moderate in certain event
  @Get('moderators/:eventId')
  findUsersModerateEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
    @Body() execludedUsersDto?: ExecludeUsers,
  ) {
    const { execludedUsers } = execludedUsersDto;
    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'moderators',
      query.username,
      query.pageNumber,
      query.pageSize,
      execludedUsers,
    );
  }
  //Returns all users that attend in certain event
  @Get('presenters/:eventId')
  findUsersPresentEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
    @Body() execludedUsersDto?: ExecludeUsers,
  ) {
    const { execludedUsers } = execludedUsersDto;
    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'presenters',
      query.username,
      query.pageNumber,
      query.pageSize,
      execludedUsers,
    );
  }

  // what if the event is not public?
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.eventService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(multerEventLogic())
  update(
    @GetCurrentUserId() eventCreatorId: string,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles()
    files: {
      image?: any;
    },
  ) {
    const imageUrl = files?.image ? files.image[0].location : null; // S3 location of the Image
    return this.eventService.updateEvent(
      eventCreatorId,
      id,
      updateEventDto,
      imageUrl,
    );
  }
  //-----------------------------------------
  //Joining/Leaving Event's endpoints
  //-----------------------------------------
  @UseGuards(AuthGuard)
  @Post('join')
  async joinEvent(
    @GetCurrentUserId() userId,
    @Body() joinEventDto: JoinEventDto,
  ) {
    await this.eventService.joinEvent(userId, joinEventDto);
    return { message: 'Successfully joined the event' };
  }
  @UseGuards(AuthGuard)
  @Delete('leave')
  async leaveEvent(
    @GetCurrentUserId() userId,
    @Body() leaveEventDto: LeaveEventDto,
  ) {
    await this.eventService.leaveEvent(userId, leaveEventDto.eventId);
    return { message: 'Successfully left the event' };
  }

  //-----------------------------------------
  //Material's endpoints
  //-----------------------------------------
  @UseGuards(AuthGuard)
  @UseInterceptors(multerMaterialtLogic())
  @Post('addMaterial/:eventId')
  addMaterialToEvent(
    @Param('eventId') eventId: string,
    @UploadedFiles() files: { materials: any },
    @GetCurrentUserId() userId: string,
  ) {
    if (!files.materials || files.materials.length === 0) {
      throw new BadRequestException('No materials uploaded');
    }

    // Extract URLs from the uploaded files
    const materialUrls = files.materials.map((material) => ({
      materialUrl: material.location, // S3 location of the file
    }));
    return this.eventService.addMaterialsToEvent(eventId, userId, materialUrls);
  }
  @UseGuards(AuthGuard)
  @Delete('deleteMaterial/:materialId')
  deleteMaterial(
    @GetCurrentUserId() userid: string,
    @Param('materialId') materialId: string,
  ) {
    return this.eventService.deleteMaterial(userid, materialId);
  }
  //-----------------------------------------
  //Assignment's endpoints
  //-----------------------------------------
  @UseGuards(AuthGuard)
  @UseInterceptors(multerMaterialtLogic())
  @Post('addAssignment/:eventId')
  addAssignmentToEvent(
    @Param('eventId') eventId: string,
    @UploadedFiles() files: { materials: any },
    @GetCurrentUserId() userId: string,
    @Body() createAssignmentDto: CreateAssignment,
  ) {
    const materialUrl = files?.materials[0].location;
    return this.eventService.addAssignmentToEvent(
      eventId,
      userId,
      createAssignmentDto.startDate,
      createAssignmentDto.endDate,
      createAssignmentDto.questions,
      materialUrl,
    );
  }
  @UseGuards(AuthGuard)
  @UseInterceptors(multerMaterialtLogic())
  @Patch('updateAssignment/:assignmentId')
  updateAssignment(
    @Param('assignmentId') assignmentId: string,
    @UploadedFiles() files: { materials: any },
    @GetCurrentUserId() userId: string,
    @Body() createAssignmentDto: UpdateAssignment,
  ) {
    const materialUrl = files?.materials[0].location;
    return this.eventService.updateAssignment(
      assignmentId,
      userId,
      createAssignmentDto.startDate,
      createAssignmentDto.endDate,
      createAssignmentDto.questions,
      materialUrl,
    );
  }
  @UseGuards(AuthGuard)
  @Delete('deleteAssignment/:assignmentId')
  deleteAssignment(
    @GetCurrentUserId() userId: string,
    @Param('assignmentId') assignmentId: string,
  ) {
    return this.eventService.deleteAssignment(assignmentId, userId);
  }

  //-----------------------------------------
  //Deleting Event's endpoint
  //-----------------------------------------
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
