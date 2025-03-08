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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { EventService } from './event.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import {
  CreateAssignment,
  CreateEventDto,
  JoinEventDto,
  LeaveEventDto,
  SeacrhUser,
  SearchEvent,
  UpdateAssignment,
  UpdateEventDto,
  CreateUpdateRating,
  AssignRoles,
  TakeAssigment,
  UpdateQuizDto,
  CreateQuizDto,
  SubmitQuizDto,
} from './dtos';
import { multerEventLogic, multerMaterialtLogic } from 'src/utils/multer.logic';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(multerEventLogic())
  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for creating an event. Include all fields from CreateEventDto and an optional image file.',
    schema: {
      type: 'object',
      properties: {
        // NOTE: Replace with your actual CreateEventDto properties.
        // For example: title: { type: 'string' }, description: { type: 'string' }, etc.
        image: { type: 'string', format: 'binary' },
      },
    },
  })
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

  // exec
  // This should only return events that are public
  @Get()
  @ApiOperation({ summary: 'Get all public events' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  getAllEvents(
    @Query() query: SearchEvent,
  ) {
    return this.eventService.getAllEvents(
      query.title,
      query.pageNumber,
      query.pageSize,
    );
  }

  // exec
  // Returns all events that have been created by the current user
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('current')
  @ApiOperation({ summary: 'Get events created by the current user' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
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

  // exec
  // Returns all events that the current user has joined
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('joinedEvents')
  @ApiOperation({ summary: 'Get events joined by the current user' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findJoinedEvents(
    @GetCurrentUserId() userId,
    @Query() query: SearchEvent,
  ) {
    return this.eventService.findJoinedEvents(
      userId,
      query.title,
      query.pageNumber,
      query.pageSize,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('assignRole/:eventId')
  @ApiOperation({ summary: 'Assign a role to a user for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiBody({
    description: 'Payload containing assignedUserId and role',
    type: AssignRoles,
  })
  assignRole(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
    @Body() assignRoleDto: AssignRoles,
  ) {
    return this.eventService.assignRole(
      userId,
      eventId,
      assignRoleDto.assignedUserId,
      assignRoleDto.role,
    );
  }

  @Get('allUsers/:eventId')
  @ApiOperation({ summary: 'Get all users of an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  findAllUsersOfEvent(@Param('eventId') eventId: string) {
    return this.eventService.findAllUsersOfEvent(eventId);
  }

  // exec 2
  // Returns all users that attend a certain event
  @Get('attendees/:eventId')
  @ApiOperation({ summary: 'Get all attendees of an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findUsersAttendEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
  ) {
    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'joinedUsers',
      query.username,
      query.pageNumber,
      query.pageSize,
    );
  }

  // exec 2
  // Returns all users that moderate a certain event
  @Get('moderators/:eventId')
  @ApiOperation({ summary: 'Get all moderators of an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findUsersModerateEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
  ) {
    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'moderators',
      query.username,
      query.pageNumber,
      query.pageSize,
    );
  }

  // exec 2
  // Returns all users that present in a certain event
  @Get('presenters/:eventId')
  @ApiOperation({ summary: 'Get all presenters of an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findUsersPresentEvent(
    @Param('eventId') eventId: string,
    @Query() query: SeacrhUser,
  ): Promise<
    {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      profilePictureUrl: string;
    }[]
  > {
    return this.eventService.findUsersParticipateInEvent(
      eventId,
      'presenters',
      query.username,
      query.pageNumber,
      query.pageSize,
    );
  }

  @Get('eventCreator/:eventId')
  @ApiOperation({ summary: 'Get the creator of an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  findEventCreator(@Param('eventId') eventId: string) {
    return this.eventService.findEventCreator(eventId);
  }

  // What if the event is not public?
  @Get(':eventId')
  @ApiOperation({ summary: 'Get event details by ID' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  getById(@Param('eventId') eventId: string) {
    return this.eventService.getById(eventId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':eventId')
  @UseInterceptors(multerEventLogic())
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for updating an event. Include all fields from UpdateEventDto and an optional image file.',
    schema: {
      type: 'object',
      properties: {
        // NOTE: Replace with your actual UpdateEventDto properties.
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @GetCurrentUserId() userId: string,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles()
    files: {
      image?: any;
    },
  ) {
    const imageUrl = files?.image ? files.image[0].location : null; // S3 location of the Image
    return this.eventService.updateEvent(
      userId,
      eventId,
      updateEventDto,
      imageUrl,
    );
  }

  //-----------------------------------------
  // Joining/Leaving Event's endpoints
  //-----------------------------------------

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('join')
  @ApiOperation({ summary: 'Join an event' })
  @ApiBody({
    description: 'Payload for joining an event',
    type: JoinEventDto,
  })
  async joinEvent(
    @GetCurrentUserId() userId,
    @Body() joinEventDto: JoinEventDto,
  ) {
    await this.eventService.joinEvent(userId, joinEventDto);
    return { message: 'Successfully joined the event' };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('leave')
  @ApiOperation({ summary: 'Leave an event' })
  @ApiBody({
    description: 'Payload for leaving an event',
    type: LeaveEventDto,
  })
  async leaveEvent(
    @GetCurrentUserId() userId,
    @Body() leaveEventDto: LeaveEventDto,
  ) {
    await this.eventService.leaveEvent(userId, leaveEventDto.eventId);
    return { message: 'Successfully left the event' };
  }

  //-----------------------------------------
  // Material's endpoints
  //-----------------------------------------

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(multerMaterialtLogic())
  @Post('addMaterial/:eventId')
  @ApiOperation({ summary: 'Add materials to an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for adding material. Expects a file upload with field name "materials".',
    schema: {
      type: 'object',
      properties: {
        materials: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
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
  @ApiBearerAuth()
  @Delete('deleteMaterial/:materialId')
  @ApiOperation({ summary: 'Delete material from an event' })
  @ApiParam({ name: 'materialId', description: 'ID of the material' })
  deleteMaterial(
    @GetCurrentUserId() userid: string,
    @Param('materialId') materialId: string,
  ) {
    return this.eventService.deleteMaterial(userid, materialId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('materials/:eventId')
  @ApiOperation({ summary: 'Get materials for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  getMaterials(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.getMaterials(userId, eventId);
  }

  //-----------------------------------------
  // Quiz endpoints
  //-----------------------------------------

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('quiz/:eventId')
  @ApiOperation({ summary: 'Get quiz for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  getQuiz(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.getQuiz(userId, eventId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('quiz/:eventId')
  @ApiOperation({ summary: 'Add a quiz to an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiBody({
    description: 'Payload for creating a quiz',
    type: CreateQuizDto,
  })
  addQuiz(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
    @Body() CreateQuizDto: CreateQuizDto,
  ) {
    return this.eventService.addQuizToEvent(userId, eventId, CreateQuizDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('quiz/:eventId/:quizId')
  @ApiOperation({ summary: 'Update a quiz for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiParam({ name: 'quizId', description: 'ID of the quiz' })
  @ApiBody({
    description: 'Payload for updating a quiz',
    type: UpdateQuizDto,
  })
  updateQuiz(
    @Param('eventId') eventId: string,
    @Param('quizId') quizId: string,
    @GetCurrentUserId() userId: string,
    @Body() UpdateQuizDto: UpdateQuizDto,
  ) {
    return this.eventService.updateQuiz(userId, eventId, quizId, UpdateQuizDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('quiz/start/:eventId/:quizId')
  @ApiOperation({ summary: 'Start a quiz' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiParam({ name: 'quizId', description: 'ID of the quiz' })
  startQuiz(
    @Param('eventId') eventId: string,
    @Param('quizId') quizId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.startQuiz(userId, eventId, quizId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('quiz/submit/:eventId/:quizId')
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiParam({ name: 'quizId', description: 'ID of the quiz' })
  @ApiBody({
    description: 'Payload containing quiz answers',
    type: SubmitQuizDto,
  })
  submitQuiz(
    @Param('eventId') eventId: string,
    @Param('quizId') quizId: string,
    @GetCurrentUserId() userId: string,
    @Body() submitQuizDto: SubmitQuizDto,
  ) {
    return this.eventService.submitQuiz(userId, quizId, submitQuizDto.answers);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('quiz/results/:eventId/:quizId')
  @ApiOperation({ summary: 'Get all quiz results for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiParam({ name: 'quizId', description: 'ID of the quiz' })
  getAllQuizResults(
    @Param('eventId') eventId: string,
    @Param('quizId') quizId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.getAllParticipantsQuizResults(
      userId,
      eventId,
      quizId,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('quiz/:eventId/:quizId')
  @ApiOperation({ summary: 'Delete a quiz from an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiParam({ name: 'quizId', description: 'ID of the quiz' })
  deleteQuiz(
    @Param('eventId') eventId: string,
    @Param('quizId') quizId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.deleteQuiz(userId, eventId, quizId);
  }

  //-----------------------------------------
  // Assignment's endpoints
  //-----------------------------------------

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('assignments/:eventId')
  @ApiOperation({ summary: 'Get assignments for an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  getAssignments(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.getAssignments(userId, eventId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('submitAssignment/:assignmentId')
  @UseInterceptors(multerMaterialtLogic())
  @ApiOperation({ summary: 'Submit an assignment' })
  @ApiParam({ name: 'assignmentId', description: 'ID of the assignment' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for submitting an assignment. Expects a file upload with field "materials" and questions in the body.',
    schema: {
      type: 'object',
      properties: {
        questions: { type: 'string' }, // Adjust type as needed (e.g., array/object)
        materials: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  submitAssignemt(
    @Param('assignmentId') assignmentId: string,
    @GetCurrentUserId() userId: string,
    @UploadedFiles() files: { materials: any },
    @Body() questionsDto: TakeAssigment,
  ) {
    const { questions } = questionsDto;
    const materialUrl = files?.materials[0].location;
    return this.eventService.submitAssignemnt(
      userId,
      assignmentId,
      materialUrl,
      questions,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(multerMaterialtLogic())
  @Post('addAssignment/:eventId')
  @ApiOperation({ summary: 'Add an assignment to an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for adding an assignment. Include assignment details and a file upload with field "materials".',
    schema: {
      type: 'object',
      properties: {
        // NOTE: Replace with your actual CreateAssignment properties.
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        questions: { type: 'string' }, // Adjust as necessary (e.g., array/object)
        materials: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
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
  @ApiBearerAuth()
  @UseInterceptors(multerMaterialtLogic())
  @Patch('updateAssignment/:assignmentId')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiParam({ name: 'assignmentId', description: 'ID of the assignment' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Payload for updating an assignment. Include updated assignment details and optionally a file upload with field "materials".',
    schema: {
      type: 'object',
      properties: {
        // NOTE: Replace with your actual UpdateAssignment properties.
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        questions: { type: 'string' },
        materials: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
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
  @ApiBearerAuth()
  @Delete('deleteAssignment/:assignmentId')
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiParam({ name: 'assignmentId', description: 'ID of the assignment' })
  deleteAssignment(
    @GetCurrentUserId() userId: string,
    @Param('assignmentId') assignmentId: string,
  ) {
    return this.eventService.deleteAssignment(assignmentId, userId);
  }

  //-----------------------------------------
  // Rating Event's endpoints
  //-----------------------------------------

  @Post('ratingEvent/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  @ApiBody({
    description: 'Payload for rating an event',
    type: CreateUpdateRating,
  })
  rateEvent(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
    @Body() ratingDto: CreateUpdateRating,
  ) {
    const { rating } = ratingDto;
    return this.eventService.rateEvent(userId, eventId, rating);
  }

  @Get('ratings/:eventId')
  @ApiOperation({ summary: 'Get event rating' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  eventRating(@Param('eventId') eventId: string) {
    return this.eventService.eventRating(eventId);
  }

  //-----------------------------------------
  // Deleting Event's endpoint
  //-----------------------------------------

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':eventId')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'eventId', description: 'ID of the event' })
  delete(
    @Param('eventId') eventId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.eventService.delete(userId, eventId);
  }
}
