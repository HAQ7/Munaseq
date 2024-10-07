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
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // dtos for createEvent and updateEvent will probably need to be updated
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @GetCurrentUserId() eventCreatorId: number,
  ) {
    return this.eventService.createEvent(createEventDto, eventCreatorId);
  }

  // this should only return events that are public
  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  // what if the event is not public?
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.eventService.getById(+id);
  }

  //   @Get(':id')
  //   getByID(@Param('id') id: string, @GetCurrentUserId() eventCreatorId: number) {
  //     return this.eventService.getById(+id, eventCreatorId);
  //   }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @GetCurrentUserId() eventCreatorId: number,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(eventCreatorId, +id, updateEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('current')
  findAllCurrentUserEvents(@GetCurrentUserId() eventCreatorId: number) {
    return this.eventService.findAllCurrentUserEvents(eventCreatorId);
  }
}
