/**
 * Created by qhyang on 2017/3/14.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

const jQuery = require("jquery");

@Component({
    selector: "wheather-card-widget",
    template: require("./weather-card-widget.component.pug"),
    styles: [require("./widget.component")]
})
export class weatherCardWidgetComponent implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef) {
        this.gridItemContainer = jQuery(el).parent().parent()[0];
    }

    ngAfterViewInit() {

    }
}