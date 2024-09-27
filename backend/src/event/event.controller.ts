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
import { CreateEventDto } from './dtos/update-event.dto';
import { UpdateEventDto } from './dtos/create-event.dto';
import { get } from 'http';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @GetCurrentUserId() eventCreatorId: number,
  ) {
    return this.eventService.createEvent(createEventDto, eventCreatorId);
  }

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
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
