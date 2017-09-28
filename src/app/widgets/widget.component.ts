/**
 * Created by qhyang on 2017/9/12.
 */

import { OnInit, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { Widget, Image } from "../interfaces";

export class WidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    protected index: number;
    protected widget: Widget;
    protected backgroundColor: string;
    protected backgroundImages: Image[];

    constructor(protected gridStackService: GridStackService, protected el: ElementRef) { }

    ngOnInit () { }

    ngAfterViewInit () {
        setTimeout(() => {
            const jQuery = require("jquery");

            this.index = Number(
                jQuery(this.el.nativeElement)
                    .parent()
                    .parent()
                    .attr("data-index")
            );

            this.gridStackService.getWidgetData().subscribe((gridStackData: Widget[]) => {
                this.widget = gridStackData[this.index];
                this.backgroundColor = this.widget.config && this.widget.config.background && this.widget.config.background.color || "transparent";
                this.backgroundImages = this.widget.config && this.widget.config.background && this.widget.config.background.images;
            });
        }, 200);
        this.gridStackService.on("update").subscribe((mutation) => {
            if (mutation.update && mutation.update[0] === this.index) {
                this.gridStackService.getWidgetData().subscribe(gridStackData => {
                    this.widget = gridStackData[this.index];
                    this.ngOnDestroy();
                    this.ngOnInit();
                    this.ngAfterViewInit();
                });
            }
        });
    }

    ngOnDestroy () { }
}
