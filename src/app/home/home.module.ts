/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HomeRoutingModule } from "./home-routing.module";

import { WidgetsModule } from "../widgets/widgets.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";
import { gridStackComponent } from "./grid-stack.component";

import { WidgetComponentPipe } from "../widgets/widget-component.pipe";

@NgModule({
    imports:      [
        BrowserModule,
        HomeRoutingModule,
        WidgetsModule
    ],
    declarations: [
        HomeComponent,
        leftNavComponent,
        gridStackComponent,
        WidgetComponentPipe
    ]
})
export class HomeModule { }