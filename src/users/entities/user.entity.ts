import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import type { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity> | null) {
    Object.assign(this, partial);
  }

  static many(users: UserEntity[]) {
    return users.map((user) => new UserEntity(user));
  }

  static one(user: UserEntity | null) {
    return new UserEntity(user);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: User['name'];

  @ApiProperty()
  email: User['email'];

  @ApiProperty()
  createdAt: User['createdAt'];

  @ApiProperty()
  updatedAt: User['updatedAt'];

  @Exclude()
  password: string;
}
