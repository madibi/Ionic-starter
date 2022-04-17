import { Component } from '@angular/core';
import { AppConfigService } from '@commons/services/app-config.service';

@Component({
  selector: 'master-root',
  templateUrl: 'master.component.html',
  styleUrls: ['master.component.scss'],
})
export class MasterComponent {
  constructor(
    private appConfigService: AppConfigService,
  ) {}
}
