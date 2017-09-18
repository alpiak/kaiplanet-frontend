/**
 * Created by qhyang on 2017/9/12.
 */

import { AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { Widget } from "../interfaces";

export class WidgetComponent implements AfterViewInit {
    protected index: number;
    protected widget: Widget;
    protected backgroundColor: string;

    constructor(protected gridStackService: GridStackService, protected el: ElementRef) { }

    ngAfterViewInit () {
        setTimeout(() => {
            const jQuery = require("jquery");

            this.index = jQuery(this.el.nativeElement)
                .parent()
                .parent()
                .attr("data-index");

            this.gridStackService.getWidgetData().subscribe(gridStackData => {
                this.widget = gridStackData[this.index];
                this.backgroundColor = this.widget.config && this.widget.config.backgroundColor || "#fff";
            });
        }, 200);
    }
}
