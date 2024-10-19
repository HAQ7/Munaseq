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
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { CreateEventDto, UpdateEventDto } from './dtos';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
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
        storage: multerS3({
          s3: new S3Client({
            region,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          }),
          bucket: bucketName,
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,

          key: (req, file, cb) => {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${file.fieldname}-${Date.now()}.${fileExt}`;
            cb(null, fileName); // The file name in the S3 bucket
          },
        }),
        fileFilter: (req, file, cb) => {
          if (file.mimetype.startsWith('image/')) {
            cb(null, true);
          } else {
            cb(
              new Error('Invalid file type, only PDF and images are allowed!'),
              false,
            );
          }
        },
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 }, // The field name for the image file
      ],
      {
        storage: multerS3({
          s3: new S3Client({
            region,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
          }),
          bucket: bucketName,
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,

          key: (req, file, cb) => {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${file.fieldname}-${Date.now()}.${fileExt}`;
            cb(null, fileName); // The file name in the S3 bucket
          },
        }),
        fileFilter: (req, file, cb) => {
          if (file.mimetype.startsWith('image/')) {
            cb(null, true);
          } else {
            cb(
              new Error('Invalid file type, only PDF and images are allowed!'),
              false,
            );
          }
        },
      },
    ),
  )
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
