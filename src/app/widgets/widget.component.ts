/**
 * Created by qhyang on 2017/9/12.
 */

import { AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

export class WidgetComponent implements AfterViewInit {
    protected index: number;
    protected widgetData: any;
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
                this.widgetData = gridStackData[this.index];
                this.backgroundColor = this.widgetData.config && this.widgetData.config.backGroundColor || "#fff";
            });
        }, 200);
    }
}
