/**
 * Created by qhyang on 2017/3/16.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";


@Directive({ selector: "[DrawingBoard]" })
export class DrawingBoardDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        require("../../styles/drawingboard");
        require("../../scripts/drawingboard");

        new window["DrawingBoard"].Board(this.el.nativeElement, {
            droppable: true
        });
    }
}