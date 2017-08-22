/**
 * Created by qhyang on 2017/4/10.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Component({
    selector: "sns-widget",
    template: require("./sns-widget.component.pug"),
    styles: [ require("./widget.component"), require("./sns-widget.component.scss") ]
})
export class SNSWidgetComponent implements AfterViewInit{
    private index: number;
    private types: Object[];

    constructor(private gridStackService: GridStackService, private el: ElementRef) { }

    ngAfterViewInit() {
        setTimeout(() => {
            const jQuery = require("jquery");

            this.index = jQuery(this.el.nativeElement).parent().parent().attr("data-index");
            this.types = this.gridStackService.getWidgetData()[this.index].config.types;

            setTimeout(() => {
                jQuery(this.el.nativeElement)
                    .children()
                    .addClass("mdl-js-tabs mdl-js-ripple-effect")
                    .each(function() {
                        window["componentHandler"].upgradeElements(this)
                    });
                jQuery(this.el.nativeElement)
                    .find("iframe")
                    .each(function() {
                        jQuery(this)
                            .attr("src", jQuery(this).attr("data-src"))
                    });
            }, 200);
        }, 200);
    }
}
