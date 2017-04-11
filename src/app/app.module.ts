/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./home/home.module";
import { WidgetsModule } from "./widgets/widgets.module";
import { EarthModule } from "./earth/earth.module";

import { AppComponent }  from "./app.component";

import { MDLUpgradeDirective } from "./mdl-upgrade.directive";

import { LoggerService } from "./logger.service";
import { BomService } from "./bom.service";
import { LocaleService } from "./locale.service";
import { GridStackService } from "./home/grid-stack.service";

@NgModule({
    imports:      [
        AppRoutingModule,
        HomeModule,
        WidgetsModule,
        EarthModule,
    ],
    providers:    [
        LoggerService,
        BomService,
        LocaleService,
        GridStackService
    ],
    declarations: [
        AppComponent,
        MDLUpgradeDirective
    ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }