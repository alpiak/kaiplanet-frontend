/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { EarthModule } from "./earth/earth.module";

import { AppComponent }  from "./app.component";

import { LoggerService } from "./logger.service";
import { BomService } from "./bom.service";
import { LoadingService } from "./loading.service";

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, EarthModule ],
    providers:    [ LoggerService, BomService, LoadingService ],
    declarations: [ AppComponent ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }