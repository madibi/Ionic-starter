import { AppTheme } from '../enum/app-theme.enum';
import {AppDirection} from "@commons/schema/app/enum/app-direction.enum";
import {Theme} from "@commons/schema/app/dto/theme.dto";

export interface UI {
  theme: Theme;
  appDirection: AppDirection;
  appTheme: AppTheme;
}
