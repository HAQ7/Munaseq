import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'), // Dynamically getting the database URL from the config service
        },
      },
    });
  }

  cleanDB() {
    return this.$transaction([
      this.user.deleteMany(), // Deletes all users
      this.event.deleteMany(), // Deletes all events
    ]);
  }
}
