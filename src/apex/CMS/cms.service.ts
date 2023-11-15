import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class CmsService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}
}
