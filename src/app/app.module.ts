/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent }  from "./app.component";
import { JumbotronComponent } from "./jumbotron.component";
import { HomeNavComponent } from "./home-nav.component";
import {LoggerService} from "./logger.service";
import {BomService} from "./bom.service";

@NgModule({
    imports:      [ BrowserModule ],
    providers:    [ LoggerService, BomService ],
    declarations: [ AppComponent, JumbotronComponent, HomeNavComponent ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }