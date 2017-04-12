/**
 * Created by qhyang on 2017/3/14.
 */

import { Component } from "@angular/core";

@Component({
    selector: "wheather-card-widget",
    template: require("./weather-card-widget.component.pug"),
    styles: [ require("./widget.component") ]
})
export class WeatherCardWidgetComponent { }