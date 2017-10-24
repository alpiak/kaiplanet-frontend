/**
 * Created by qhyang on 2017/2/16.
 */

import "rxjs/add/operator/map";
import { Component, OnInit } from "@angular/core";

import { BomService } from "../bom.service";

@Component({
    selector: "jumbotron",
    template: require("./jumbotron.component.pug"),
    styles: [ require("./jumbotron.component.scss") ]
})
export class JumbotronComponent implements OnInit {
    height: number;
    width: number;

    constructor(private bomService: BomService) { }

    ngOnInit() {
        this.height = this.bomService.getWindowHeight();
        new Parallax(document.getElementById("parallax-scene"));
        this.bomService.onWindowResize()
            .subscribe(() => this.height = this.bomService.getWindowHeight());
    }
}
