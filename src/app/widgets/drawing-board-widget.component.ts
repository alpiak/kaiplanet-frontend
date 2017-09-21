/**
 * Created by qhyang on 2017/3/16.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

import { Widget } from "../interfaces";

@Component({
    selector: "drawing-board-widget",
    template: require("./drawing-board-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./drawing-board-widget.component.scss") ]
})
export class DrawingBoardWidgetComponent extends WidgetComponent implements AfterViewInit {
    private imgUrl: string;

    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.gridStackService.getWidgetData().subscribe(() => {
                if (!this.widget.data) {
                    this.widget.data = {};
                }
                let imgUrl = this.widget.data.imgUrl;
                if (imgUrl) {
                    this.imgUrl = imgUrl;
                }
            });
        }, 300);
    }
    onDrew(imgUrl: string) {
        Object.assign(this.widget.data, { imgUrl: imgUrl});
        this.gridStackService.updateGridStackData(this.index, this.widget);
    }
}