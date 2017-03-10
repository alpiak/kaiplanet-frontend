/**
 * Created by qhyang on 2017/3/10.
 */

import { Pipe, PipeTransform, Component } from "@angular/core";

import { carouselWidgetComponent } from "./carousel-widget.component";

/*
 * Get the relevant Angular component to the type
 * Usage:
 *   value | widgetComponent
 * Example:
 *   {{ "carousel" |  widgetComponent }}
 *   formats to: 1024
 */
@Pipe({name: "widgetComponent"})
export class WidgetComponentPipe implements PipeTransform {
    transform(value: string): Component {
        if (value === "carousel") {
            return carouselWidgetComponent;
        }
    }
}