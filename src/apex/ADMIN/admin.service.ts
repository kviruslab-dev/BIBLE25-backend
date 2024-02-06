import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import {
  arrayToFormattedString,
  stringToArray,
} from 'src/common/utils/functions';

import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_TYPE_OBJECT, titleToPage } from 'src/common/const';
import { Board } from 'src/common/entities/board.entity';
import { Market } from 'src/common/entities/market.entity';
import { MarketItem } from 'src/common/entities/product.entity';
import { ToDayContent } from 'src/common/entities/todaycontent.entity';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { CreateMarketDto } from './dtos/createMarket.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CreateTodayBookDto } from './dtos/createTodayBook.dto';
import { UpdateBoardDto } from './dtos/updateBoard.dto';
import { UpdateMalsumDto } from './dtos/updateMalsum.dto';
import { UpdateMarketDto } from './dtos/updateMarket.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { UpdateTodayBookDto } from './dtos/updateTodayBook.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly queryRunnerService: QueryRunnerService,
    @InjectRepository(ToDayContent)
    private readonly repoTodayContent: Repository<ToDayContent>,
    @InjectRepository(Market)
    private readonly repoMarket: Repository<Market>,
    @InjectRepository(MarketItem)
    private readonly repoMarketItem: Repository<MarketItem>,
    @InjectRepository(Board)
    private readonly repoBoard: Repository<Board>,
  ) {}

  async findAndCount(type: string) {
    const marketType = ['main', 'bible', 'hymm', 'todays', 'lab', 'etc'];
    const pageString = arrayToFormattedString(ADMIN_TYPE_OBJECT[type]);

    if (marketType.includes(type)) {
      const condition = {
        select:
          'id, create_at, title, tick, start_date, end_date, page, location, rate, image, link, active, city, timezone',
        table: 'market',
        where: `page in ${pageString}`,
        orderBy: 'id asc ',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'product') {
      const condition = {
        select:
          'id, create_at, gubun, tick, title, money, star, dc, image, link, sequence, active',
        table: 'market_item',
        where: `TRUE`,
        orderBy: 'id asc',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'donate') {
      const condition = {
        select: 'id, create_at, title, image, link, type',
        table: 'board',
        where: `TRUE`,
        orderBy: 'id asc',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }
  }

  async getLocal(type: string | undefined) {
    const typeArr = stringToArray(type);

    const cities = fs.readFileSync('src/common/json/cities.json', 'utf8');
    const citiesJson = JSON.parse(cities);

    if (type === undefined) {
      return Object.keys(citiesJson);
    }

    function getNeighbourhoods(locationArray: string[]) {
      if (!Array.isArray(locationArray) || locationArray.length === 0) {
        throw new Error('Please provide a valid location array.');
      }

      let currentData = citiesJson;
      for (const loc of locationArray) {
        currentData = currentData[loc];
        if (!currentData) {
          return '';
        }
      }

      return currentData;
    }

    function isArray(data: any) {
      return Array.isArray(data);
    }

    if (!isArray(getNeighbourhoods(typeArr))) {
      return Object.keys(getNeighbourhoods(typeArr));
    } else {
      return getNeighbourhoods(typeArr);
    }
  }

  async delete(type: string, id: number) {
    const marketType = ['main', 'bible', 'hymm', 'todays', 'lab', 'etc'];

    let table: string;
    if (marketType.includes(type)) {
      table = 'market';
    }

    if (type === 'product') {
      table = 'market_item';
    }

    if (type === 'donate') {
      table = 'board';
    }

    const condition = {
      table,
      where: `id = ${id}`,
    };

    return await this.queryRunnerService.delete(condition);
  }

  async createTodayBook(
    files: Express.Multer.File[],
    data: CreateTodayBookDto,
  ) {
    const { today, title, content, song } = data;
    const fileName = files[0].filename;

    const temp = this.repoTodayContent.create({
      today,
      title,
      content,
      song,
      image: `https://data.bible25.com/uploads/${fileName}`,
      frame: 1,
      gubun: 6,
      writer: '',
      name: '오늘의책',
      yojul: '',
      bible: '',
      sungchal: '',
      kido: '',
      active: 0,
    });
    await this.repoTodayContent.save(temp);
    return;
  }

  async getTodayBook(take: number, page: number) {
    const condition = {
      select: 'id, today, title, content, song, image, name, active',
      table: 'today_content',
      where: `gubun = 6`,
      orderBy: 'today desc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    const data = await this.queryRunnerService.findAndCount(condition);
    return data.list;
  }

  async updateTodayBook(
    files: Express.Multer.File[],
    data: UpdateTodayBookDto,
  ) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      const id = Number(data.id);
      const { today, title, song, content } = data;
      await this.repoTodayContent.update(
        { id },
        { image, today, title, song, content },
      );
      return;
    }

    if (files.length === 0) {
      const id = Number(data.id);
      const { today, title, song, content } = data;
      await this.repoTodayContent.update(
        { id },
        { today, title, song, content },
      );
      return;
    }
  }

  async createMalsum(data: any) {
    delete data.id;
    const temp = this.repoTodayContent.create({
      ...data,
      gubun: 1,
      name: '말씀따라',
    });
    await this.repoTodayContent.save(temp);
    return;
  }

  async getMalsum(take: number, page: number) {
    return this.repoTodayContent.find({
      select: [
        'id',
        'today',
        'name',
        'title',
        'yojul',
        'song',
        'bible',
        'sungchal',
        'kido',
        'content',
        'active',
      ],
      where: { gubun: 1 },
      order: {
        today: 'DESC',
      },
      take,
      skip: take * (page - 1),
    });
  }

  async updateMalsum(data: UpdateMalsumDto[]) {
    data.map(async (v) => {
      await this.repoTodayContent.update({ id: v.id }, v);
    });
  }

  async createAd(files: Express.Multer.File[], data: CreateMarketDto) {
    const image = `https://data.bible25.com/uploads/${files[0].filename}`;
    const page = titleToPage[data.title];

    const temp = this.repoMarket.create({
      title: data.title,
      start_date: data.start_date,
      end_date: data.end_date,
      page,
      location: Number(data.location),
      rate: Number(data.rate),
      link: data.link,
      active: Number(data.active),
      city: data.city,
      timezone: 'Asia/Seoul',
      image,
    });
    await this.repoMarket.save(temp);
    return;
  }

  async createPd(files: Express.Multer.File[], data: CreateProductDto) {
    const image = `https://data.bible25.com/uploads/${files[0].filename}`;
    const temp = this.repoMarketItem.create({
      title: data.title,
      gubun: Number(data.gubun),
      money: Number(data.money),
      star: data.star,
      dc: Number(data.dc),
      sequence: Number(data.sequence),
      link: data.link,
      active: Number(data.active),
      image,
    });
    await this.repoMarketItem.save(temp);
    return;
  }

  async createBd(files: Express.Multer.File[], data: CreateBoardDto) {
    const image = `https://data.bible25.com/uploads/${files[0].filename}`;
    const temp = this.repoBoard.create({
      title: data.title,
      link: data.link,
      type: Number(data.type),
      image,
    });
    await this.repoBoard.save(temp);
    return;
  }

  async updateAd(files: Express.Multer.File[], data: UpdateMarketDto) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      const id = Number(data.id);
      await this.repoMarket.update(
        { id },
        {
          title: data.title,
          start_date: data.start_date,
          end_date: data.end_date,
          page: Number(data.page),
          location: Number(data.location),
          rate: Number(data.rate),
          link: data.link,
          active: Number(data.active),
          city: data.city,
          timezone: data.timezone,
          image,
        },
      );
      return;
    }

    if (files.length === 0) {
      const id = Number(data.id);
      await this.repoMarket.update(
        { id },
        {
          title: data.title,
          start_date: data.start_date,
          end_date: data.end_date,
          page: Number(data.page),
          location: Number(data.location),
          rate: Number(data.rate),
          link: data.link,
          active: Number(data.active),
          city: data.city,
          timezone: data.timezone,
        },
      );
      return;
    }
  }

  async updatePd(files: Express.Multer.File[], data: UpdateProductDto) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      const id = Number(data.id);
      await this.repoMarketItem.update(
        { id },
        {
          title: data.title,
          gubun: Number(data.gubun),
          money: Number(data.money),
          star: data.star,
          dc: Number(data.dc),
          sequence: Number(data.sequence),
          link: data.link,
          active: Number(data.active),
          image,
        },
      );
      return;
    }

    if (files.length === 0) {
      const id = Number(data.id);
      await this.repoMarketItem.update(
        { id },
        {
          title: data.title,
          gubun: Number(data.gubun),
          money: Number(data.money),
          star: data.star,
          dc: Number(data.dc),
          sequence: Number(data.sequence),
          link: data.link,
          active: Number(data.active),
        },
      );
      return;
    }
  }

  async updateBd(files: Express.Multer.File[], data: UpdateBoardDto) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      const id = Number(data.id);
      await this.repoBoard.update(
        { id },
        { title: data.title, link: data.link, type: Number(data.type), image },
      );
      return;
    }

    if (files.length === 0) {
      const id = Number(data.id);
      await this.repoBoard.update(
        { id },
        { title: data.title, link: data.link, type: Number(data.type) },
      );
      return;
    }
  }

  async createCalum(files: Express.Multer.File[], data: any) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      delete data.id;
      const temp = this.repoTodayContent.create({
        ...data,
        image,
        gubun: 4,
        name: '칼럼',
      });
      await this.repoTodayContent.save(temp);
      return;
    }

    delete data.id;
    const temp = this.repoTodayContent.create({ ...data, gubun: 4 });
    await this.repoTodayContent.save(temp);
    return;
  }

  async getCalum(take: number, page: number) {
    return this.repoTodayContent.find({
      select: [
        'id',
        'today',
        'title',
        'content',
        'song',
        'image',
        'name',
        'active',
      ],
      where: { gubun: 4 },
      order: {
        today: 'DESC',
      },
      take,
      skip: take * (page - 1),
    });
  }

  async updateCalum(files: Express.Multer.File[], data: UpdateTodayBookDto) {
    if (files.length !== 0) {
      const image = `https://data.bible25.com/uploads/${files[0].filename}`;
      const id = Number(data.id);
      const { today, title, song, content } = data;
      await this.repoTodayContent.update(
        { id },
        { image, today, title, song, content },
      );
      return;
    }

    if (files.length === 0) {
      const id = Number(data.id);
      const { today, title, song, content } = data;
      await this.repoTodayContent.update(
        { id },
        { today, title, song, content },
      );
      return;
    }
  }
}
