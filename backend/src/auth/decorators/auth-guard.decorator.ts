import { UseGuards } from '@nestjs/common';
import { AuthGuard as JwtAuthGuard } from '../auth.guard'; // Rename to avoid confusion

export function AuthGuard() {
  return UseGuards(JwtAuthGuard);
}
