/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule }      from "@angular/core";
import { CommonModule } from "@angular/common";

import { carouselWidgetComponent } from "./carousel-widget.component";

@NgModule({
    imports:      [ CommonModule ],
    declarations: [ carouselWidgetComponent ],
    entryComponents: [ carouselWidgetComponent ],
    exports:      [ carouselWidgetComponent ]
})
export class WidgetsModule { }