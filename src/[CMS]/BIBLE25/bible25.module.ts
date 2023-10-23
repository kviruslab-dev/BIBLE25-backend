import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { Bible25Controller } from './bible25.controller';
import { Bible25Service } from './bible25.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [Bible25Controller],
  providers: [Bible25Service],
  exports: [],
})
export class Bible25Module {}
