/**
 * Created by qhyang on 2017/2/16.
 */

import "rxjs/add/operator/map";
import {Component, OnInit} from "@angular/core";

import { BomService } from "./bom.service";

@Component({
    selector: "jumbotron",
    template: require("./jumbotron.component.pug")(),
    styles: [require("./jumbotron.component.scss")]
})
export class JumbotronComponent implements OnInit{
    height: number;
    width: number;

    constructor(private bomService: BomService) {
        this.height = window.innerHeight;
    }

    ngOnInit() {
        new Parallax(document.getElementById("scene"));
        this.bomService.windowResize()
            .map((event: any) => event.target)
            .subscribe((target: Window) => {
                this.height = target.innerHeight;
                this.width = target.innerWidth;
            });
    }
}