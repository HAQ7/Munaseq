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
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import {
  CreateEventDto,
  JoinEventDto,
  LeaveEventDto,
  SearchEvent,
  UpdateEventDto,
} from './dtos';

import { multerEventLogic } from 'src/utils/multer.logic';
import { query } from 'express';

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
  getAllEvents(@Query() query: SearchEvent) {
    return this.eventService.getAllEvents(
      query.title,
      query.pageNumber,
      query.pageSize,
    );
  }

  @UseGuards(AuthGuard)
  @Get('current')
  findAllCurrentUserEvents(
    @GetCurrentUserId() eventCreatorId: string,
    @Query() query: SearchEvent,
  ) {
    return this.eventService.findAllCurrentUserEvents(
      eventCreatorId,
      query.title,
      query.pageNumber,
      query.pageSize,
    );
  }
  @UseGuards(AuthGuard)
  @Get('joinedEvents')
  findJoinedEvents(@GetCurrentUserId() userId, @Query() query: SearchEvent) {
    return this.eventService.findJoinedEvents(
      userId,
      query.title,
      query.pageNumber,
      query.pageSize,
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
