import { Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImportBatchUseCase } from './application/create-import-batch.usecase';
import { GenerateReportUseCase } from '../report/application/generate-report.usecase';

@Controller()
export class ImportController {
  constructor(
    private readonly createUseCase: CreateImportBatchUseCase,
    private readonly reportUseCase: GenerateReportUseCase,
  ) {}

  @Post('imports')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const batch = await this.createUseCase.execute(file.originalname);
    return { batchId: batch.id, status: batch.status };
  }

  @Post('reports/:batchId')
  async generate(@Param('batchId') batchId: string) {
    const content = await this.reportUseCase.execute(batchId);
    return { content };
  }
}
