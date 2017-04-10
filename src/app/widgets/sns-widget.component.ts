/**
 * Created by qhyang on 2017/4/10.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { GridStackService } from "../home/grid-stack.service";

@Component({
    selector: "sns-widget",
    template: require("./sns-widget.component.pug"),
    styles: [ require("./widget.component"), require("./sns-widget.component.scss") ]
})
export class SNSWidgetComponent implements AfterViewInit{
    private index: number;
    private types: Object[];

    constructor(private gridStackService: GridStackService, private domSanitizer: DomSanitizer, private el: ElementRef) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        setTimeout(() => {
            this.index = jQuery(this.el.nativeElement).parent().parent().attr("data-index");
            this.types = this.gridStackService.getWidgetData()[this.index].config.types;

            setTimeout(() => {
                jQuery(this.el.nativeElement)
                    .children()
                    .addClass("mdl-js-tabs mdl-js-ripple-effect")
                    .each(function() {
                        window["componentHandler"].upgradeElements(this)
                    });
            }, 200);
        }, 200);
    }
}
