import { ImageInfo } from '@commons/schema/common/dto/image-info.dto';
import { User } from '../entity/user.entity';
import { UserPrivate } from './user-private.dto';
import { UserPublic } from './user-public.dto';
import { UserSemiPrivate } from './user-semi-private.dto';
import * as Enum_Role from './../enum/role.enum';
import * as Entity_Role from './../../enum/entity/role.entity';
export interface UserInfo<
U extends UserPublic | UserSemiPrivate | UserPrivate | User = UserPublic,
R extends Enum_Role.Role | Entity_Role.Role | null = Enum_Role.Role> {
  user?: U;
  roles?: R[];
  avatar? : ImageInfo;
}
