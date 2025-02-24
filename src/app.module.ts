import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { OracleSpModule } from './oraclesp/oraclesp.module';

@Module({
  imports: [DbModule, OracleSpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
