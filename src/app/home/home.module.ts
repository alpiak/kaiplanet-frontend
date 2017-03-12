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
import { widgetFrameComponent } from "./widget-frame.component";

import { GridStackService } from "./grid-stack.service";

import { WidgetComponentPipe } from "../widgets/widget-component.pipe";

@NgModule({
    imports:      [
        BrowserModule,
        HomeRoutingModule,
        WidgetsModule
    ],
    providers:    [
        GridStackService
    ],
    declarations: [
        HomeComponent,
        leftNavComponent,
        gridStackComponent,
        widgetFrameComponent,
        WidgetComponentPipe
    ]
})
export class HomeModule { }