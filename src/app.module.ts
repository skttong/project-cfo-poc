import { Module } from '@nestjs/common';
import { ImportModule } from './modules/import/import.module';
import { ReportModule } from './modules/report/report.module';
import { JobModule } from './modules/job/status-update.processor';


@Module({
    imports: [ImportModule, ReportModule, JobModule],
})
export class AppModule {}