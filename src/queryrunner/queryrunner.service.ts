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

    // if (!total) {
    //   throw new HttpException(
    //     `데이터가 존재하지 않습니다.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    return { list, total };
  }

  async getTotal(condition: any) {
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

    const data = await this.queryRunner.query(SQL);

    if (data.length === 0) {
      // throw new HttpException(
      //   `데이터가 존재하지 않습니다.`,
      //   HttpStatus.BAD_REQUEST,
      // );
      return;
    }

    return data[0];
  }

  async update(condition: any) {
    try {
      const SQL = `
      UPDATE ${condition.table}
      SET (${condition.columns}) = (${condition.values})
      WHERE ${condition.where}
      `;

      await this.queryRunner.query(SQL);
    } catch {
      throw new HttpException(
        `UPDATE 조건을 다시 확인해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insert(condition: any) {
    try {
      const SQL = `
      INSERT INTO ${condition.table}(${condition.columns})
      VALUES (${condition.values})
      `;

      await this.queryRunner.query(SQL);
    } catch {
      throw new HttpException(
        `INSERT 조건을 다시 확인해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(condition: any) {
    try {
      const SQL = `
      DELETE
      FROM ${condition.table}
      WHERE ${condition.where}
      `;

      await this.queryRunner.query(SQL);
    } catch {
      throw new HttpException(
        `UPDATE 조건을 다시 확인해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async query(SQL: string) {
    try {
      return this.queryRunner.query(SQL);
    } catch {
      throw new HttpException(
        `qeury를 다시 확인해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
