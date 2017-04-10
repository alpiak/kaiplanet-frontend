/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { HeaderWidgetComponent } from "./header-widget.component";
import { CarouselWidgetComponent } from "./carousel-widget.component";
import { WeatherCardWidgetComponent } from "./weather-card-widget.component";
import { DrawingBoardWidgetComponent } from "./drawing-board-widget.component";
import { MoonOceanWidgetComponent } from "./moon-ocean-widget.component";
import { WaterfallWidgetComponent } from "./waterfall-widget.component";
import { PlainWidgetComponent } from "./plain-widget.component";
import { SNSWidgetComponent } from "./sns-widget.component";
import { AddWidgetFormComponent } from "../home/add-widget-form.component";

import { ThreeImageTransitionDirective } from "./three-image-transition.directive";
import { AnimatedWeatherCardDirective } from "./animated-weather-card.directive";
import { DrawingBoardDirective } from "./drawing-board.directive";
import { WaterfallDirective } from "./waterfall.directive";
import { AnimatedBackgroundDirective } from "./animated-background.directive";

import { ArrayPipe } from "../array.pipe";

@NgModule({
    imports:      [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent,
        SNSWidgetComponent,
        AddWidgetFormComponent,
        ThreeImageTransitionDirective,
        AnimatedWeatherCardDirective,
        DrawingBoardDirective,
        WaterfallDirective,
        AnimatedBackgroundDirective,
        ArrayPipe
    ],
    entryComponents: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent,
        SNSWidgetComponent
    ],
    exports: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        MoonOceanWidgetComponent,
        WaterfallWidgetComponent,
        PlainWidgetComponent,
        SNSWidgetComponent
    ]
})
export class WidgetsModule { }