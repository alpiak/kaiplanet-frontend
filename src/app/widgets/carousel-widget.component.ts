/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

let jQuery = require("jquery");

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [require("./widget.component"), require("./carousel-widget.component.scss")]
})
export class carouselWidgetComponent implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) {
        this.gridItemContainer = jQuery(el).parent().parent()[0];
    }

    ngAfterViewInit() {
        let ThreeImageTransition = require("../../scripts/three-image-transition");

        setTimeout(() => {
            let threeImageTransition = ThreeImageTransition(jQuery(this.el.nativeElement).children().first()[0]);
            this.gridStackService.on("resizeStop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    threeImageTransition.resize();
                }
            });
        }, 300);
    }
}
