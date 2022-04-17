import { createSelector } from '@ngrx/store';
import {EnumState} from '@commons/store/enum/enum.state';

export const enumState = (state: any) => state.enum;

export const selectEnum = createSelector(
    enumState,
    (_enumState: EnumState) => _enumState
);

export const selectEnumOptions = createSelector(
  enumState,
  (_enumState: EnumState) => _enumState.options
);

export const selectEnumEnumOptionSample = createSelector(
  enumState,
  (_enumState: EnumState) => _enumState.options.enumOptionSample
);

export const selectEnumLanguages = createSelector(
  enumState,
  (_enumState: EnumState) => _enumState.languages
);

