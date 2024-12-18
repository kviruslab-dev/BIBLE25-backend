import { Injectable } from '@nestjs/common';
import { BIBLE_MAP_URL, BIBLE_PHOTODIC_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class SearchService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}
  async findSearchingData(take: number, page: number, keyword: string) {
    const bible = await this.findAndCountBible(take, page, keyword);
    const dic = await this.findAndCountDic(take, page, keyword);
    const photodic = await this.findAndCountPhotodic(take, page, keyword);
    const biblemap = await this.findAndCountBiblemap(take, page, keyword);
    const jusuk = await this.findAndCountJusuk(take, page, keyword, false);
    const kanghae = await this.findAndCountKanghae(take, page, keyword, false);

    return {
      list: {
        bible: bible.list,
        dic: dic.list,
        photodic: photodic.list,
        biblemap: biblemap.list,
        jusuk: jusuk.list,
        kanghae: kanghae.list,
      },
    };
  }

  async findOneBible(id: number) {
    const condition = {
      select: 'recno as id, bname as title, krv as content',
      table: 'com_mbe_tbl',
      where: `recno = ${id}`,
    };

    return await this.queryRunnerService.findOne(condition);
  }

  async findAndCountBible(take: number, page: number, keyword: string) {
    const condition = {
      select: 'recno as id, bname as title, SUBSTRING(krv, 1, 30) as content',
      table: 'com_mbe_tbl',
      where: `krv like '%${keyword.trim()}%'`,
      orderBy: 'recno asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async findOneDic(id: number) {
    const condition = {
      select: 'id,  title, content',
      table: 'bible_dic',
      where: `id = ${id}`,
    };

    return await this.queryRunnerService.findOne(condition);
  }

  async findAndCountDic(take: number, page: number, keyword: string) {
    const condition = {
      select: 'id, title, SUBSTRING(content, 1, 50) as content',
      table: 'bible_dic',
      where: `title like '%${keyword.trim()}%'`,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async findOnePhotodic(id: number) {
    const condition = {
      select: 'id, imgidx, title, content, detail',
      table: 'bible_photodic',
      where: `id = ${id}`,
    };

    const data = await this.queryRunnerService.findOne(condition);

    const conditionToGetImage = {
      select: 'title, image',
      table: 'img_info',
      where: `image_gubun = 'photo_bible_dic' and imgidx = ${data.imgidx}`,
      orderBy: 'id asc',
      limit: 10,
      offset: 0,
    };

    const { list } = await this.queryRunnerService.findAndCount(
      conditionToGetImage,
    );

    data['image'] = list.map((val: any) => {
      val.title = val.title.substring(0, val.title.length - 4);
      val.image = BIBLE_PHOTODIC_URL + val.image;
      return val;
    });

    const { imgidx, ...newData } = data;

    return newData;
  }

  async findAndCountPhotodic(take: number, page: number, keyword: string) {
    const condition = {
      select: 'id, title, SUBSTRING(content, 1, 50) as content',
      table: 'bible_photodic',
      where: `title like '%${keyword.trim()}%'`,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async findOneBiblemap(id: number) {
    const condition = {
      select: 'id, imgidx, title, content, detail',
      table: 'bible_map',
      where: `id = ${id}`,
    };

    const data = await this.queryRunnerService.findOne(condition);

    const conditionToGetImage = {
      select: 'title, image',
      table: 'img_info',
      where: `image_gubun = 'bible_map' and imgidx = ${data.imgidx}`,
      orderBy: 'id asc',
      limit: 10,
      offset: 0,
    };

    const { list } = await this.queryRunnerService.findAndCount(
      conditionToGetImage,
    );

    data['image'] = list.map((val: any) => {
      val.title = val.title.substring(0, val.title.length - 4);
      val.image = BIBLE_MAP_URL + val.image;
      return val;
    });

    const { imgidx, ...newData } = data;

    return newData;
  }

  async findAndCountBiblemap(take: number, page: number, keyword: string) {
    const condition = {
      select: 'id, title, SUBSTRING(content, 1, 30) as content',
      table: 'bible_map',
      where: `title like '%${keyword.trim()}%'`,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async findOneJusuk(id: number) {
    const tableArray = [
      'deluxe_matt_new',
      'deluxe_ben',
      'deluxe_nadb',
      'deluxe_cannon',
      'deluxe_range',
      'deluxe_pulpit',
      'deluxe_emet',
      'deluxe_jang',
      'deluxe_season',
      'deluxe_mipung',
      'deluxe_meyer',
      'deluxe_chong',
      'deluxe_wil',
      'deluxe_grace',
      'deluxe_seven',
    ];

    const condition = {
      select: 'id, title, content',
      table: `${tableArray[Number(String(id).substr(0, 2)) - 11]}`,
      where: `id = ${Number(String(id).substring(2))}`,
    };

    return await this.queryRunnerService.findOne(condition);
  }

  async findAndCountJusuk(
    take: number,
    page: number,
    keyword: string,
    calcutaleTotal: boolean,
  ) {
    const sTake = String(take ? take : 10);
    const sPage = String(page ? take * (page - 1) : 0);
    const skeyword = `%${keyword.trim()}%`;

    const sql = `
        SELECT 
        sequence, 
        CONCAT(sequence + 10, id) AS id, 
        title, 
        SUBSTRING(content, 1, 30) AS content 
    FROM (
        SELECT 1 as sequence, id, title, content FROM deluxe_matt_new WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 2 as sequence, id, title, content FROM deluxe_ben WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 3 as sequence, id, title, content FROM deluxe_nadb WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 4 as sequence, id, title, content FROM deluxe_cannon WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 5 as sequence, id, title, content FROM deluxe_range WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 6 as sequence, id, title, content FROM deluxe_pulpit WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 7 as sequence, id, title, content FROM deluxe_emet WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 8 as sequence, id, title, content FROM deluxe_jang WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 9 as sequence, id, title, content FROM deluxe_season WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 10 as sequence, id, title, content FROM deluxe_mipung WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 11 as sequence, id, title, content FROM deluxe_meyer WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 12 as sequence, id, title, content FROM deluxe_chong WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 13 as sequence, id, title, content FROM deluxe_wil WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 14 as sequence, id, title, content FROM deluxe_grace WHERE title LIKE '${skeyword}'
        UNION ALL
        SELECT 15 as sequence, id, title, content FROM deluxe_seven WHERE title LIKE '${skeyword}'
    ) AS merged_data
    ORDER BY sequence, id ASC 
    LIMIT ${sTake} OFFSET ${sPage};
    `;

    if (calcutaleTotal) {
      const sqlForEachCount = `
        SELECT SUM(count_result) AS total_count
        FROM (
            SELECT COUNT(*) AS count_result FROM deluxe_matt_new WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_ben WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_nadb WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_cannon WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_range WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_pulpit WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_emet WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_jang WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_season WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_mipung WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_meyer WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_chong WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_wil WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_grace WHERE title LIKE '${skeyword}' UNION ALL
            SELECT COUNT(*) AS count_result FROM deluxe_seven WHERE title LIKE '${skeyword}'
        ) AS counts;
        `;

      const list = await this.queryRunnerService.query(sql);
      const total = await this.queryRunnerService.query(sqlForEachCount);

      return { list, total: total[0].total_count };
    }

    const list = await this.queryRunnerService.query(sql);
    return { list, total: 10 };
  }

  async findOneKanghae(id: number) {
    const arrayType = Number(String(id).substr(0, 2)) - 51;

    const tableArray = [
      'g5_write_g71',
      'g5_write_Sagun1',
      'g5_write_Sagun2',
      'g5_write_Dtp',
      'g5_write_Dtp_Chong',
      'BIBLE_KANG',
    ];

    if (arrayType <= 55) {
      const condition = {
        select: 'wr_id as id, wr_subject as title, wr_content as content',
        table: `${tableArray[Number(String(id).substr(0, 2)) - 51]}`,
        where: `wr_id = ${Number(String(id).substring(2))}`,
      };

      return await this.queryRunnerService.findOne(condition);
    }

    if (arrayType > 56) {
      const condition = {
        select: 'idx as id, title, context as content',
        table: `${tableArray[Number(String(id).substr(0, 2)) - 51]}`,
        where: `idx = ${Number(String(id).substring(2))}`,
      };

      return await this.queryRunnerService.findOne(condition);
    }
  }

  async findAndCountKanghae(
    take: number,
    page: number,
    keyword: string,
    calcutaleTotal: boolean,
  ) {
    const sTake = String(take ? take : 10);
    const sPage = String(page ? take * (page - 1) : 0);
    const skeyword = `%${keyword.trim()}%`;

    const sql = `
        SELECT 
        sequence, 
        CONCAT(50 + sequence, wr_id) as id, 
        wr_subject as title, 
        SUBSTRING(wr_content, 1, 30) as content 
    FROM (
        SELECT 1 as sequence, wr_id, wr_subject, wr_content 
        FROM g5_write_g71 
        WHERE wr_subject LIKE '${skeyword}'
        UNION ALL
        SELECT 2 as sequence, wr_id, wr_subject, wr_content 
        FROM g5_write_Sagun1 
        WHERE wr_subject LIKE '${skeyword}'
        UNION ALL
        SELECT 3 as sequence, wr_id, wr_subject, wr_content 
        FROM g5_write_Sagun2 
        WHERE wr_subject LIKE '${skeyword}'
        UNION ALL
        SELECT 4 as sequence, wr_id, wr_subject, wr_content 
        FROM g5_write_Dtp 
        WHERE wr_subject LIKE '${skeyword}'
        UNION ALL
        SELECT 5 as sequence, wr_id, wr_subject, wr_content 
        FROM g5_write_Dtp_Chong 
        WHERE wr_subject LIKE '${skeyword}'
    ) AS merged_data

    UNION ALL

    SELECT 
        6 as sequence, 
        CONCAT(56, idx) as id, 
        title, 
        SUBSTRING(context, 1, 30) as content 
    FROM BIBLE_KANG 
    WHERE title LIKE '${skeyword}'

    ORDER BY sequence, id ASC 
    LIMIT ${sTake} OFFSET ${sPage};
    `;

    if (calcutaleTotal) {
      const sqlForEachCount = `
      SELECT SUM(count_result) AS total_count
      FROM (
          SELECT COUNT(*) AS count_result FROM g5_write_g71 WHERE wr_subject LIKE '${skeyword}' UNION ALL
          SELECT COUNT(*) AS count_result FROM g5_write_Sagun1 WHERE wr_subject LIKE '${skeyword}' UNION ALL
          SELECT COUNT(*) AS count_result FROM g5_write_Sagun2 WHERE wr_subject LIKE '${skeyword}' UNION ALL
          SELECT COUNT(*) AS count_result FROM g5_write_Dtp WHERE wr_subject LIKE '${skeyword}' UNION ALL
          SELECT COUNT(*) AS count_result FROM g5_write_Dtp_Chong WHERE wr_subject LIKE '${skeyword}'
      ) AS counts;
      `;

      const list = await this.queryRunnerService.query(sql);
      const total = await this.queryRunnerService.query(sqlForEachCount);

      return { list, total: total[0].total_count };
    }

    const list = await this.queryRunnerService.query(sql);
    return { list, total: 10 };
  }
}
