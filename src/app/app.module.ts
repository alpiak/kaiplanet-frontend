/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./home/home.module";
import { EarthBreathModule } from "./earth-breath/earth-breath.module";

import { AppComponent }  from "./app.component";

import { LoggerService } from "./logger.service";
import { BomService } from "./bom.service";
import { GridStackService } from "./home/grid-stack.service";

@NgModule({
    imports:      [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        EarthBreathModule
    ],
    providers:    [
        LoggerService,
        BomService,
        GridStackService
    ],
    declarations: [ AppComponent ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }