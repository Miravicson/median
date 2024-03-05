import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger = new Logger(this.constructor.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database ✅');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database ❌');
  }
}
