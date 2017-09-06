/**
 * Created by qhyang on 2017/3/16.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Component({
    selector: "drawing-board-widget",
    template: require("./drawing-board-widget.component.pug"),
    styles: [ require("./widget.component"), require("./drawing-board-widget.component.scss") ]
})
export class DrawingBoardWidgetComponent implements AfterViewInit{
    private index: number;
    private imgUrl: string;
    private widgetData: any;

    constructor(private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            const jQuery = require("jquery");

            this.index = jQuery(this.el.nativeElement)
                .parent()
                .parent()
                .attr("data-index");

            this.gridStackService.getWidgetData().subscribe(gridStackData => {
                this.widgetData = gridStackData[this.index];
                if (!this.widgetData.data) {
                    this.widgetData.data = {};
                }
                let imgUrl = this.widgetData.data.imgUrl;
                if (imgUrl) {
                    this.imgUrl = imgUrl;
                }
            });
        }, 200);
    }
    onDrew(imgUrl: string) {
        Object.assign(this.widgetData.data, { imgUrl: imgUrl});

        let widgetData = {};

        Object.assign(widgetData, this.widgetData);
        this.gridStackService.updateGridStackData(this.index, widgetData);
    }
}