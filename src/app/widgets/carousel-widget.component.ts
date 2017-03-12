/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [require("./widget.component"), require("./carousel-widget.component.scss")]
})
export class carouselWidgetComponent implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let JQuery = require("jquery"),
            ThreeImageTransition = require("../../scripts/three-image-transition");

        setTimeout(() => {
            ThreeImageTransition(JQuery(this.el.nativeElement).children().first()[0]);
        }, 300);
    }
}
