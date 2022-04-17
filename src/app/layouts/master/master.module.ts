import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppInitializer } from '@commons/settings/app-initializer';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {StoreModule} from "@ngrx/store";
import { baseReducers, metaReducers } from '@commons/store/_base/_base.reducer';
import {EffectsModule} from "@ngrx/effects";
import { AppEffects } from '@commons/store/app/app.effect';
import { UserEffects } from '@commons/store/user/user.effect';
import { EnumEffects } from '@commons/store/enum/enum.effect';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import { ErrorHandlingService } from '@commons/services/error-handling/error-handling.service';
import { environment } from '@environments/environment';
import { StoreRouteCustomSerializer } from '@commons/helpers/store-route-custome-serilizer.helper';
import { BaseUrlInterceptor } from '@commons/interceptors/base-url.interceptor';
import { HeaderInterceptor } from '@commons/interceptors/header.interceptor';
import { LoaderInterceptor } from '@commons/interceptors/loader.interceptor';
import { CatchErrorInterceptor } from '@commons/interceptors/catch-error.interceptor';

@NgModule({
  declarations: [
    MasterComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppInitializer,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(baseReducers, {metaReducers}),
    EffectsModule.forRoot([
      AppEffects,
      UserEffects,
      EnumEffects,
    ]),
    // TODO: disable ngrx in product mode
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    MasterRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    ErrorHandlingService,
    { provide: 'BASE_API_URL', useValue: environment.serverUrl },
    { provide: RouterStateSerializer, useClass: StoreRouteCustomSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true },
  ],
  bootstrap: [MasterComponent],
})
export class MasterModule {}

export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}
