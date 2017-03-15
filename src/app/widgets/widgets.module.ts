/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule }      from "@angular/core";
import { CommonModule } from "@angular/common";

import { headerWidgetComponent } from "./header-widget.component";
import { carouselWidgetComponent } from "./carousel-widget.component";
import { weatherCardWidgetComponent } from "./weather-card-widget.component";

import { ThreeImageTransitionDirective } from "./three-image-transition.directive";
import { AnimatedWeatherCardDirective } from "./animated-weather-card.directive";

import { GridStackService } from "../home/grid-stack.service";

@NgModule({
    imports:      [ CommonModule ],
    providers:    [ GridStackService ],
    declarations: [
        headerWidgetComponent,
        carouselWidgetComponent,
        weatherCardWidgetComponent,
        ThreeImageTransitionDirective,
        AnimatedWeatherCardDirective
    ],
    entryComponents: [
        headerWidgetComponent,
        carouselWidgetComponent,
        weatherCardWidgetComponent
    ],
    exports:      [ carouselWidgetComponent ]
})
export class WidgetsModule { }