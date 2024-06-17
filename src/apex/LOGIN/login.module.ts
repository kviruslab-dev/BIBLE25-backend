import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [],
})
export class LoginModule {}
