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

  @UseGuards(AuthGuard)
  @Get()
  findAllUserEvents(@GetCurrentUserId() eventCreatorId: number) {
    return this.eventService.findAllUserEvents(eventCreatorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(+id, updateEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
