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

    constructor(private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.index = jQuery(this.el.nativeElement).parent().parent().attr("data-index");
        this.imgUrl = this.gridStackService.getWidgetData()[this.index].data.imgUrl;
    }
}