/**
 * Created by qhyang on 2017/3/16.
 */

import { Directive, ElementRef, AfterViewInit, EventEmitter, Input, Output } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { UserService } from "../user.service";
import { BomService } from "../bom.service";
import { GridStackService } from "../home/grid-stack.service";
import { UploadService } from "../upload.service";

@Directive({ selector: "[drawingBoard]" })
export class DrawingBoardDirective implements AfterViewInit {
    @Input("drawingBoard") index: number;
    @Input() imgUrl: string;
    @Output() onDrew = new EventEmitter<string>();
    private gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private userService: UserService, private bomService: BomService, private gridStackService: GridStackService, private uploadService: UploadService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        require("../../styles/drawingboard");
        require("../../scripts/drawingboard");

        let drawingBoard: any;

        this.gridStackService.on("init").subscribe(() => {
            setTimeout(() => {
                sessionStorage.setItem("drawing-board-" + this.index, this.imgUrl);
                drawingBoard = new window["DrawingBoard"].Board(this.el.nativeElement, this.index, {
                    controlsPosition: "top right",
                    droppable: true,
                    stretchImg: true
                });
                drawingBoard.ev.bind("board:stopDrawing", () => {
                    let imgBase64 = drawingBoard.getImg().split(",")[1];

                    this.userService.getUserInfo().subscribe(() => {
                        this.uploadService.uploadBase64Encoded(imgBase64, this.index + "_" + "drawingboard.png").subscribe((res: any) => {
                            res = res.json();
                            if (res.code === 1) {
                                this.onDrew.emit(res.data.img.url);
                            } else if (res.code === -1) {
                                //TODO: add reminder for upload failure
                            }
                        });
                    });
                });
                window["drawingBoard"] = drawingBoard;
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
                        }, 200);
                    }
                });
            }, 300);
        });

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