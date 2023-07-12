import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('device_info')
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @Column({
    nullable: false,
    length: 300,
    default: '',
    comment: '디바이스 아이디',
  })
  deviceId: string;

  @Column({
    nullable: false,
    default: 1,
    comment: '앱 푸시를 허용하는지 아닌지',
  })
  pushyn: number;

  @Column({
    nullable: false,
    length: 200,
    default: '',
    comment: '운영자 노트 기입',
  })
  note: string;

  @Column({
    nullable: false,
    default: '',
    comment: '위도',
  })
  lat: string;

  @Column({
    nullable: false,
    default: '',
    comment: '경도',
  })
  lon: string;

  @Column({
    nullable: false,
    default: '',
    comment: 'Gangseo-gu',
  })
  city: string;
  @Column({
    nullable: false,
    default: '',
    comment: '서울',
  })
  timezone: string;

  @Column({
    nullable: false,
    default: '',
    comment: '한국',
  })
  country: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: 'IP',
  // })
  // ip: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: '주제 메시징을 위한 주제',
  // })
  // topic: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: '기기 그룹 메세징을 위한 그룹',
  // })
  // group: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: 'country:KR',
  // })
  // country: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: '서울',
  // })
  // timezone: string;

  // @Column({
  //   nullable: false,
  //   default: '',
  //   comment: 'Gangseo-gu',
  // })
  // city: string;
}
