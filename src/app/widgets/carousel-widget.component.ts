/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

import { WidgetComponent } from "./widget.component";

import { Image } from "../interfaces";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./carousel-widget.component.scss") ]
})
export class CarouselWidgetComponent extends WidgetComponent implements AfterViewInit {
    private images: Image[];

    constructor(gridStackService: GridStackService, private router: Router, private bomService: BomService, el: ElementRef) { super(gridStackService, el); }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.images = (this.widget.data && this.widget.data.images);
        }, 300);
    }
    navigateTo(link: string) {
        if (/^\//.test(link)) {
            this.router.navigate([ link ]);
        } else if (/^http/.test(link)) {
            this.bomService.navigateTo(link);
        }
    }
}
