/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderWidgetComponent } from "./header-widget.component";
import { CarouselWidgetComponent } from "./carousel-widget.component";
import { WeatherCardWidgetComponent } from "./weather-card-widget.component";
import { DrawingBoardWidgetComponent } from "./drawing-board-widget.component";
import { MoonOceanWidgetComponent } from "./moon-ocean-widget.component";
import { WaterfallWidgetComponent } from "./waterfall-widget.component";
import { PlainWidgetComponent } from "./plain-widget.component";

import { ThreeImageTransitionDirective } from "./three-image-transition.directive";
import { AnimatedWeatherCardDirective } from "./animated-weather-card.directive";
import { DrawingBoardDirective } from "./drawing-board.directive";
import { WaterfallDirective } from "./waterfall.directive";
import { AnimatedBackgroundDirective } from "./animated-background.directive";

@NgModule({
    imports:      [ CommonModule ],
    declarations: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent,
        ThreeImageTransitionDirective,
        AnimatedWeatherCardDirective,
        DrawingBoardDirective,
        WaterfallDirective,
        AnimatedBackgroundDirective
    ],
    entryComponents: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent
    ],
    exports:      [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent
    ]
})
export class WidgetsModule { }