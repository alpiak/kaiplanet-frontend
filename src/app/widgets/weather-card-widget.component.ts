/**
 * Created by qhyang on 2017/3/14.
 */

import { Component, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "wheather-card-widget",
    template: require("./weather-card-widget.component.pug"),
    styles: [ require("./widget.component.scss") ]
})
export class WeatherCardWidgetComponent extends WidgetComponent {
    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }
}
