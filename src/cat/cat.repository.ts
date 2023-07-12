import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatRepository {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepo: Repository<Cat>,
  ) {}

  async findByIdAndUpdateImg(id: number, fileName: string) {
    const cat = await this.catRepo.findOneBy({ id });
    cat.imgUrl = `http://localhost:5000/media/${fileName}`;
    await this.save(cat);
    return await this.findOneById(id);
  }

  async findCatByWithoutPassword(catId: number): Promise<Cat | null> {
    const cat = await this.catRepo.findOne({
      select: ['id', 'email', 'name', 'imgUrl'],
      where: [{ id: catId }],
    });
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const user = await this.catRepo.findOneBy({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const catInfo = await this.catRepo.findOneBy({ email });
    return catInfo ? true : false;
  }

  create(cat: CatRequestDto): Cat {
    return this.catRepo.create(cat);
  }

  async save(cat: CatRequestDto): Promise<Cat> {
    return this.catRepo.save(cat);
  }

  async findOneByEmail(email: string): Promise<Cat | null> {
    return await this.catRepo.findOne({
      select: ['id', 'email', 'name', 'imgUrl'],
      where: [{ email }],
    });
  }

  async findOneById(id: number): Promise<Cat | null> {
    return await this.catRepo.findOne({
      select: ['id', 'email', 'name', 'imgUrl'],
      where: [{ id }],
    });
  }
}
