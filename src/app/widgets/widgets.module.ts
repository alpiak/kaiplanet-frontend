/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { carouselWidgetComponent } from "./carousel-widget.component";

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ carouselWidgetComponent ],
    exports:      [ carouselWidgetComponent ]
})
export class WidgetsModule { }