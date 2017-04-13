/**
 * Created by qhyang on 2017/3/9.
 */

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "carousel-widget",
    template: require("./carousel-widget.component.pug"),
    styles: [ require("./widget.component"), require("./carousel-widget.component.scss") ]
})
export class CarouselWidgetComponent implements OnInit{
    images: string[];

    constructor(private router: Router) { }

    ngOnInit() {
        this.images = [ require("../../assets/screenshot1.jpg"), require("../../assets/screenshot2.jpg") ];
    }
    navigateTo(dir: string) {
        this.router.navigate([ dir ]);
    }
}
