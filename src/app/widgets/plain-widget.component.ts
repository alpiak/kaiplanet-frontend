/**
 * Created by qhyang on 2017/4/1.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Component({
    selector: "plain-widget",
    template: require("./plain-widget.component.pug"),
    styles: [ require("./widget.component"), require("./plain-widget.component.scss") ]
})
export class PlainWidgetComponent implements AfterViewInit{
    private index: number;
    private type: string;

    constructor(private gridStackService: GridStackService, private el: ElementRef) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.index = jQuery(this.el.nativeElement).parent().parent().attr("data-index");
        this.type = this.gridStackService.getWidgetData()[this.index].config.type;
    }
}