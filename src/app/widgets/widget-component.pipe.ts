/**
 * Created by qhyang on 2017/3/10.
 */

import { Pipe, PipeTransform, Component } from "@angular/core";

import { carouselWidgetComponent } from "./carousel-widget.component";
import { weatherCardWidgetComponent } from "./weather-card-widget.component";

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
                return carouselWidgetComponent;
            case "weather-card":
                return weatherCardWidgetComponent;
        }
    }
}