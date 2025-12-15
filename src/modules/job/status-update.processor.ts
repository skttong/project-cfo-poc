import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { ImportStatus } from '../import/domain/import-batch.entity';

@Injectable()
export class StatusUpdateProcessor {
  constructor(private readonly prisma: PrismaService) {}

  async processPending() {
    const pending = await this.prisma.importBatch.findMany({
      where: { status: ImportStatus.PENDING },
    });

    for (const batch of pending) {
      await this.prisma.importBatch.update({
        where: { id: batch.id },
        data: { status: ImportStatus.DONE },
      });
      console.log(`Batch ${batch.id} marked as DONE`);
    }
  }
}
