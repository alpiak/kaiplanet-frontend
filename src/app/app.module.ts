/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./home/home.module";
import { WidgetsModule } from "./widgets/widgets.module";
import { EarthModule } from "./earth/earth.module";

import { AppComponent }  from "./app.component";
import { MDLUpgradeDirective } from "./mdl-upgrade.directive";

import {UserService} from "./user.service";
import { GridStackService } from "./home/grid-stack.service";
import { BomService } from "./bom.service";
import { TimeService } from "./time.service";
import { UploadService } from "./upload.service";
import { LoadingService } from "./loading.service";
import { WeatherService } from "./weather.service";
import { LocaleService } from "./locale.service";
import { LoggerService } from "./logger.service";

@NgModule({
    imports: [
        HttpModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HomeModule,
        WidgetsModule,
        EarthModule,
    ],
    providers: [
        UserService,
        GridStackService,
        LocaleService,
        LoadingService,
        BomService,
        TimeService,
        UploadService,
        WeatherService,
        LoggerService
    ],
    declarations: [
        AppComponent,
        MDLUpgradeDirective
    ],
    exports: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
