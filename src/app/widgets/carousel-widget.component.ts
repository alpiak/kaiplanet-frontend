/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./carousel-widget.component.scss") ]
})
export class CarouselWidgetComponent extends WidgetComponent implements OnInit {
    images: string[];

    constructor(gridStackService: GridStackService, private router: Router, el: ElementRef) { super(gridStackService, el); }

    ngOnInit() {
        this.images = [ require("../../assets/screenshot1.jpg"), require("../../assets/screenshot2.jpg"), "http://localhost:9999/fd3081c6c60cceccf9d1decadf7ec1fa.jpg" ];
    }
    navigateTo(dir: string) {
        this.router.navigate([ dir ]);
    }
}
