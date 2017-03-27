/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[animatedWeatherCard]" })
export class AnimatedWeatherCardDirective implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        require("../../styles/animated-weather-cards.scss");

        const AnimatedWeatherCards = require("../../scripts/animated-weather-cards");

        let animatedWeatherCards: any;

        setTimeout(() => animatedWeatherCards = AnimatedWeatherCards(this.el.nativeElement), 300);
        this.gridStackService.on("init").subscribe(() => {
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    animatedWeatherCards.resize();
                }
            });
        });
    }
}