import { IsUUID } from 'class-validator';

export class LeaveEventDto {
  @IsUUID()
  eventId: string;
}