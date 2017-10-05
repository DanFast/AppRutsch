import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';
import {GoogleMaps} from '@ionic-native/google-maps';
import {ReportOnePage} from "../pages/report-one/report-one";
import {ReportTwoPage} from "../pages/report-two/report-two";
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    LoginPage,
    ReportOnePage,
    ReportTwoPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    LoginPage,
    ReportOnePage,
    ReportTwoPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
