import { Module } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { OracleController } from './oracle.controller';
import { OracleDBService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[DbModule],
  providers: [OracleService],
  controllers: [OracleController],
  exports:[OracleService]
})
export class OracleModule {}
