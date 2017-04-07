/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./home/home.module";
import { EarthBreathModule } from "./earth-breath/earth-breath.module";

import { AppComponent }  from "./app.component";

import { LoggerService } from "./logger.service";
import { BomService } from "./bom.service";
import { LocaleService } from "./locale.service";
import { GridStackService } from "./home/grid-stack.service";

@NgModule({
    imports:      [
        AppRoutingModule,
        HomeModule,
        EarthBreathModule,
    ],
    providers:    [
        LoggerService,
        BomService,
        LocaleService,
        GridStackService
    ],
    declarations: [ AppComponent ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }