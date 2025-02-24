import { Module } from '@nestjs/common';
import { OracleSpService } from './oraclesp.service';
import { OracleSpController } from './oraclesp.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[DbModule],
  providers: [OracleSpService],
  controllers: [OracleSpController]
})
export class OracleSpModule {}
