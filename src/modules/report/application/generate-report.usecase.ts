import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma.service';

@Injectable()
export class GenerateReportUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(batchId: string): Promise<string> {
    const batch = await this.prisma.importBatch.findUnique({ where: { id: batchId } });
    if (!batch) throw new Error('Batch not found');

    const content = `Report for batch ${batch.id}, status: ${batch.status}`;
    await this.prisma.report.create({ data: { id: batch.id, batchId: batch.id, content } });
    return content;
  }
}
