/**
 * Created by qhyang on 2017/3/9.
 */

import { Component } from "@angular/core";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [require("./widget.component"), require("./carousel-widget.component.scss")]
})
export class carouselWidgetComponent { }
