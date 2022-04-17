
import {Options} from "./../../schema/enum/dto/options.dto";
import {Role} from "@commons/schema/enum/entity/role.entity";
import {Language} from "@commons/schema/enum/entity/language.entity";

export interface EnumState {
  options: Options;
  roles: Role[];
  languages: Language[];
}
