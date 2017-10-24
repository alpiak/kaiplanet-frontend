/**
 * Created by qhyang on 2017/4/10.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "sns-widget",
    template: require("./sns-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./sns-widget.component.scss") ]
})
export class SNSWidgetComponent extends WidgetComponent implements AfterViewInit{
    private types: Object[];

    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }

    ngAfterViewInit() {
        this.gridStackService.getWidgetData().subscribe(gridStackData => {
            const jQuery = require("jquery");

            this.index = jQuery(this.el.nativeElement).parent().parent().attr("data-index");
            this.types = gridStackData[this.index].config.types;

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
        });
    }
}
