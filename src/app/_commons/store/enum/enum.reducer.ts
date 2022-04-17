import {Action, createReducer, on} from '@ngrx/store';
import { EnumState } from '@commons/store/enum/enum.state';
import { initialEnumState } from './initial-enum.state';
import * as Enum_Actions from './enum.action';

const reducer = createReducer(
  initialEnumState,

  on(Enum_Actions.resetState, (state: EnumState) => ({ ...state, ...{initialEnumState} })),

  on(Enum_Actions.updateEnums,
    (state: EnumState, { enumInfo }) =>
    ({ ...state, ...{
        options: enumInfo.options,
        languages: enumInfo.languages,
        roles: enumInfo.roles,
    }})
  ),

);

export const enumReducer = (state: EnumState | undefined, action: Action) =>
  reducer(state, action);
