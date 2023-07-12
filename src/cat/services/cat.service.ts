import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cat.request.dto';
import * as bcrypt from 'bcrypt';
import { CatRepository } from '../cat.repository';
import { Cat } from '../cat.entity';
@Injectable()
export class CatService {
  constructor(private readonly catRepo: CatRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catRepo.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('이미 회원가입 되어있는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = this.catRepo.create({
      email,
      name,
      password: hashedPassword,
    });

    await this.catRepo.save(cat);

    return await this.catRepo.findOneByEmail(email);
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cat/${files[0].filename}`;

    console.log(fileName);
    const newCat = await this.catRepo.findByIdAndUpdateImg(cat.id, fileName);
    console.log(newCat);
    return newCat;
  }
}
