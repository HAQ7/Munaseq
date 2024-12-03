import { IsString } from 'class-validator';

export class AssignRoles {
  @IsString()
  assignedUserId: string;
  @IsString()
  role: string;
}
