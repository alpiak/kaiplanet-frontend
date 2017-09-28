/**
 * Created by qhyang on 2017/3/10.
 */

import { Pipe, PipeTransform, Component } from "@angular/core";

import { HeaderWidgetComponent } from "./header-widget.component";
import { CarouselWidgetComponent } from "./carousel-widget.component";
import { WeatherCardWidgetComponent } from "./weather-card-widget.component";
import { DrawingBoardWidgetComponent } from "./drawing-board-widget.component";
import { RichTextWidgetComponent } from "./rich-text-widget.component";
import { MoonOceanWidgetComponent } from "./moon-ocean-widget.component";
import { WaterfallWidgetComponent} from "./waterfall-widget.component";
import { PlainWidgetComponent } from "./plain-widget.component";
import { SNSWidgetComponent } from "./sns-widget.component";

/*
 * Get the relevant Angular component to the type
 * Usage:
 *   value | widgetComponent
 * Example:
 *   {{ "carousel" |  widgetComponent }}
 */
@Pipe({name: "widgetComponent"})
export class WidgetComponentPipe implements PipeTransform {
    transform(value: string): Component {
        switch (value) {
            case "carousel":
                return CarouselWidgetComponent;
            case "weather-card":
                return WeatherCardWidgetComponent;
            case "header":
                return HeaderWidgetComponent;
            case "drawing-board":
                return DrawingBoardWidgetComponent;
            case "rich-text":
                return RichTextWidgetComponent;
            case "moon-ocean":
                return MoonOceanWidgetComponent;
            case "waterfall":
                return WaterfallWidgetComponent;
            case "plain":
                return PlainWidgetComponent;
            case "sns":
                return SNSWidgetComponent;
        }
    }
}