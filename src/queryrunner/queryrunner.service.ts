import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class QueryRunnerService {
  constructor(
    @InjectRepository(DataSource)
    private readonly queryRunner: Repository<QueryRunner>,
  ) {}

  async findAndCount(condition: any) {
    const SQL = `
    SELECT ${condition.select}
    FROM ${condition.table}
    WHERE ${condition.where}
    ORDER BY ${condition.orderBy}
    LIMIT ${condition.limit}
    OFFSET ${condition.offset};
    `;

    const list = await this.queryRunner.query(SQL);
    const total = await this.getTotal(condition);

    if (!total) {
      throw new HttpException(
        `데이터가 존재하지 않습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { list, total };
  }

  async getTotal(condition: any) {
    console.log(condition);
    const SQL = `
    SELECT count(*) as total
    FROM ${condition.table}
    WHERE ${condition.where};
    `;

    const data = await this.queryRunner.query(SQL);

    return Number(data[0].total);
  }

  async findOne(condition: any) {
    const SQL = `
    SELECT ${condition.select}
    FROM ${condition.table}
    WHERE ${condition.where}
    `;

    const [data] = await this.queryRunner.query(SQL);

    if (!data) {
      throw new HttpException(
        `데이터가 존재하지 않습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }
}
