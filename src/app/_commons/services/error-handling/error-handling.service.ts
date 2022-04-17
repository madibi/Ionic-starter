import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
@Injectable()

export class ErrorHandlingService {
  public isDialogOpen = false;
  constructor(
    private toastrService: ToastrService,
  ) { }
  async openDialog(data: any) {
    console.log('%c<<< ' + '------------------------------------------------------------', 'color: #ff0000');
    console.log('%c error status:' + data.status, 'color: #fffe00');
    console.log(data.message);
    console.log(data.reason);
    console.log('%c------------------------------------------------------------ ' + '>>>', 'color: #ff0000');
    this.toastrService.error(data.reason, '');
  }
}
