/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[animatedWeatherCard]" })
export class AnimatedWeatherCardDirective implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(el.nativeElement).parent().parent()[0];
    }

    ngAfterViewInit() {
        require("../../styles/animated-weather-cards.scss");

        let AnimatedWeatherCards = require("../../scripts/animated-weather-cards"),
            animatedWeatherCards: any;

        setTimeout(() => animatedWeatherCards = AnimatedWeatherCards(this.el.nativeElement), 300);
        this.gridStackService.on("resizeStop").subscribe((event) => {
            if (event.target === this.gridItemContainer) {
                animatedWeatherCards.resize();
            }
        });
    }
}