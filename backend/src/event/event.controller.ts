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
  UseInterceptors,
  UploadedFiles,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { CreateEventDto, UpdateEventDto } from './dtos';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // dtos for createEvent and updateEvent will probably need to be updated
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 }, // The field name for the image file
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            // Check file type to determine where to save the file
            if (file.mimetype.startsWith('image/')) {
              cb(null, './images'); // Save images in the images folder
            } else {
              cb(new Error('Invalid file type'), null); // Handle invalid file types
            }
          },
          filename: (req, file, cb) => {
            // Custom filename: original name + timestamp to avoid overwrites
            const name = file.originalname.split('.')[0]; // Get original name
            const fileExtName = extname(file.originalname); // Get file extension
            const timestamp = Date.now(); // Add a timestamp for uniqueness
            cb(null, `${name}-${timestamp}${fileExtName}`);
          },
        }),
      },
    ),
  )
  @Post()
  create(
    @Body()
    createEventDto: CreateEventDto,
    @GetCurrentUserId() eventCreatorId: string,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    const image = files?.image ? files.image[0] : null;
    return this.eventService.createEvent(createEventDto, eventCreatorId, image);
  }

  // this should only return events that are public
  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @UseGuards(AuthGuard)
  @Get('current')
  findAllCurrentUserEvents(@GetCurrentUserId() eventCreatorId: string) {
    return this.eventService.findAllCurrentUserEvents(eventCreatorId);
  }
  // what if the event is not public?
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.eventService.getById(id);
  }

  //   @Get(':id')
  //   getByID(@Param('id') id: string, @GetCurrentUserId() eventCreatorId: number) {
  //     return this.eventService.getById(+id, eventCreatorId);
  //   }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 }, // The field name for the image file
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            // Check file type to determine where to save the file
            if (file.mimetype.startsWith('image/')) {
              cb(null, './images'); // Save images in the images folder
            } else {
              cb(new Error('Invalid file type'), null); // Handle invalid file types
            }
          },
          filename: (req, file, cb) => {
            // Custom filename: original name + timestamp to avoid overwrites
            const name = file.originalname.split('.')[0]; // Get original name
            const fileExtName = extname(file.originalname); // Get file extension
            const timestamp = Date.now(); // Add a timestamp for uniqueness
            cb(null, `${name}-${timestamp}${fileExtName}`);
          },
        }),
      },
    ),
  )
  @Patch(':id')
  update(
    @GetCurrentUserId() eventCreatorId: string,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    const image = files?.image ? files.image[0] : null;
    return this.eventService.updateEvent(
      eventCreatorId,
      id,
      updateEventDto,
      image,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
