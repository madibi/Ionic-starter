import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
      public alertController: AlertController,
      private translateService: TranslateService,
      private router: Router,
    ) {}

    async show(
      cssClass: string,
      header: string,
      subHeader: string,
      commaSeparatedButtons: string,
      message: string,
    ): Promise<any> {
      const buttons: any = [];
      commaSeparatedButtons
        .split(',')
        .forEach((button, index) => {
          buttons.push({
          text: button,
          role: index,
          cssClass: 'button',
          handler: (click: any) => {
            // console.log(click);
          }
        });
      });
      const alertProperties: any = {
        cssClass,
        header,
        subHeader,
        message,
        buttons
      };
      const alert = await this.alertController.create(alertProperties);
      await alert.present();
      return await alert.onDidDismiss(); // role: "backdrop" in case of click on back
    }

    async loginFirst(): Promise<void> {

      const promise = new Promise(async (resolve, reject) => {
        const res= await this.show(
          'flat-alert',
          this.translateService.instant('alert.send-request.title'),
          this.translateService.instant('alert.send-request.sub-title'),
          this.translateService.instant('alert.send-request.buttons'),
          this.translateService.instant('alert.send-request.message')
        );
        if (res.role === 0) {
          this.router.navigateByUrl('/login').then();
        };
        resolve(null);
      });
      promise.then((res) => res);
      promise.catch((err) => {
        // This is never called
      });
    }
}
