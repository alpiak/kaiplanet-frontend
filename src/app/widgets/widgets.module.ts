/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule }      from "@angular/core";
import { CommonModule } from "@angular/common";

import { carouselWidgetComponent } from "./carousel-widget.component";

import { GridStackService } from "../home/grid-stack.service";

@NgModule({
    imports:      [ CommonModule ],
    providers:    [ GridStackService ],
    declarations: [ carouselWidgetComponent ],
    entryComponents: [ carouselWidgetComponent ],
    exports:      [ carouselWidgetComponent ]
})
export class WidgetsModule { }