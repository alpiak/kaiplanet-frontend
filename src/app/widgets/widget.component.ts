/**
 * Created by qhyang on 2017/9/12.
 */

import { OnInit, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { Widget } from "../interfaces";

export class WidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    protected index: number;
    protected widget: Widget;
    protected backgroundColor: string;

    constructor(protected gridStackService: GridStackService, protected el: ElementRef) { }

    ngOnInit;

    ngAfterViewInit () {
        setTimeout(() => {
            const jQuery = require("jquery");

            this.index = jQuery(this.el.nativeElement)
                .parent()
                .parent()
                .attr("data-index");

            this.gridStackService.getWidgetData().subscribe(gridStackData => {
                this.widget = gridStackData[this.index];
                this.backgroundColor = this.widget.config && this.widget.config.background.color || "#fff";
            });
        }, 200);
        this.gridStackService.on("update").subscribe((mutation) => {
            if (mutation.update.length === 1 && mutation.update[0] === this.index) {
                this.gridStackService.getWidgetData().subscribe(gridStackData => {
                    this.widget = gridStackData[this.index];
                });
                this.ngOnDestroy();
                this.ngOnInit();
                this.ngAfterViewInit();
            }
        });
    }

    ngOnDestroy;
}
