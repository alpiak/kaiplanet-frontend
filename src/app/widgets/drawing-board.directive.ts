/**
 * Created by qhyang on 2017/3/16.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { BomService } from "../bom.service";
import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[drawingBoard]" })
export class DrawingBoardDirective implements AfterViewInit {
    @Input("drawingBoard") index: number;
    @Input() imgUrl: string;
    private gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService, private bomService: BomService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        require("../../styles/drawingboard");
        require("../../scripts/drawingboard");

        let drawingBoard: any;

        setTimeout(() => {
            sessionStorage.setItem("drawing-board-" + this.index, this.imgUrl);
            drawingBoard = new window["DrawingBoard"].Board(this.el.nativeElement, this.index, {
                controlsPosition: "top right",
                droppable: true,
                stretchImg: true
            });
            drawingBoard.restoreWebStorage();
            this.gridStackService.on("resizestart").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    jQuery(this.el.nativeElement).hide();
                }
            });
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    jQuery(this.el.nativeElement).show();
                    setTimeout(() => {
                        drawingBoard.resize();
                        drawingBoard.restoreWebStorage();
                    }, 300);
                }
            });
        }, 300);

        window.addEventListener("resize", () => {
            setTimeout(() => drawingBoard.resize(), 300);
        });
        delay.call(this.bomService.windowResize(), 300)
            .subscribe(() => {
                drawingBoard.resize();
                drawingBoard.restoreWebStorage();
            });
    }
}