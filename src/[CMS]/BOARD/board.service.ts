import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class BoardService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}
}
