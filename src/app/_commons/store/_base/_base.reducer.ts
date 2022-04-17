import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';
import { BaseState } from './_base.state';
import { appReducer } from '../app/app.reducer';
import {enumReducer} from '@commons/store/enum/enum.reducer';
import {userReducer} from '@commons/store/user/user.reducer';

export const baseReducers: ActionReducerMap<BaseState> = {
  router: routerReducer,
  app: appReducer,
  enum: enumReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<BaseState>[] =
  !environment.production ? [storeFreeze] : [];
