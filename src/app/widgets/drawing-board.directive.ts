/**
 * Created by qhyang on 2017/3/16.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[DrawingBoard]" })
export class DrawingBoardDirective implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(el.nativeElement).parent().parent()[0];
    }

    ngAfterViewInit() {
        require("../../styles/drawingboard");
        require("../../scripts/drawingboard");

        let drawingBoard: any;

        setTimeout(() => {
            drawingBoard = new window["DrawingBoard"].Board(this.el.nativeElement, {
                droppable: true
            });
        }, 200);

        window.addEventListener("resize", () => {
            setTimeout(() => drawingBoard.resize(), 300);
        });
        this.gridStackService.on("init").subscribe(() => {
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    setTimeout(() => drawingBoard.resize(), 300);
                }
            });
        });
    }
}