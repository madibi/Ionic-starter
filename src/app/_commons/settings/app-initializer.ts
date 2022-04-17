import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppInitService } from '@commons/services/app-init.service';

export const GET_CONFIGURATION = (appInitService: AppInitService) => () => appInitService.initApp();
export const CHECK_TOKEN = (appInitService: AppInitService) => () => appInitService.checkTokenExpiration();
export const PRINT_LOGO = (appInitService: AppInitService) => () => appInitService.printLogo();

@NgModule({
    imports: [],
    providers: [
        AppInitService,
        { provide: APP_INITIALIZER, useFactory: GET_CONFIGURATION, deps: [AppInitService], multi: true },
        { provide: APP_INITIALIZER, useFactory: CHECK_TOKEN, deps: [AppInitService], multi: true },
        { provide: APP_INITIALIZER, useFactory: PRINT_LOGO, deps: [AppInitService], multi: true }
    ]
})
export class AppInitializer { }
