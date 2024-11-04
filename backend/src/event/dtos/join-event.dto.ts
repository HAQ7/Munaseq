import { IsUUID } from 'class-validator';

export class JoinEventDto {
  @IsUUID()
  eventId: string;
}