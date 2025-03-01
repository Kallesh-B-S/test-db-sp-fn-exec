import { Module } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { OracleController } from './oracle.controller';
import { DbModule } from 'src/db/db.module';
import { ParamTableService } from './paramTable.service';

@Module({
  imports:[DbModule],
  providers: [OracleService,ParamTableService],
  controllers: [OracleController],
  exports:[OracleService,ParamTableService]
})
export class OracleModule {}
