/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, OnInit } from "@angular/core";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [require("./carousel-widget.component.scss")]
})
export class carouselWidgetComponent implements OnInit {
    ngOnInit() {
        let ThreeImageTransition = require("../../scripts/three-image-transition");

        ThreeImageTransition("three-container");
    }
}