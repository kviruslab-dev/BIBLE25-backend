import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

//https://docs.nestjs.com/techniques/task-scheduling
@Injectable()
export class AutoService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}
}
