import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import type { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  static many(users: UserEntity[]) {
    return users.map((user) => new UserEntity(user));
  }

  static one(user: UserEntity) {
    return new UserEntity(user);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  password: string;
}
