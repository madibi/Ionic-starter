import { Injectable } from '@angular/core';
import {UserAssetsInfo} from '@commons/schema/user/model/user-assets-info.model';

@Injectable({
  providedIn: 'root',
})
export class SharedInfoService {
    public userAssetsInfo: UserAssetsInfo = {
      entranceSmsCode: '',
      professions: null
    };

    public layout = {
        showVideoFullAndTop: false,
        showHamburgerMenu: false
    };

    public pageInfo = {
      pages: [],
      page: 0,
      size: 6,
      categoryId: ''
    };
}
