import { Module } from '@nestjs/common';
import { MssqlDBService, OracleDBService } from './db.service';

@Module({
  providers: [OracleDBService,MssqlDBService],
  exports:[OracleDBService,MssqlDBService]
})
export class DbModule {}
