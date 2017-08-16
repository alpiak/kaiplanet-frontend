/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";

import { HomeRoutingModule } from "./home-routing.module";

import { WidgetsModule } from "../widgets/widgets.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";
import { gridStackComponent } from "./grid-stack.component";
import { widgetFrameComponent } from "./widget-frame.component";

import { WidgetComponentPipe } from "../widgets/widget-component.pipe";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HomeRoutingModule,
        WidgetsModule
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