/**
 * Created by qhyang on 2017/3/31.
 */

import { Component, OnInit } from "@angular/core";

import { BomService } from "../bom.service";

@Component({
    selector: "globe",
    template: require("./globe.component.pug"),
    styles: [ require("./globe.component.scss") ]
})
export class GlobeComponent implements OnInit {
    private height: number;

    constructor(private bomService: BomService) { }

    ngOnInit() {
        this.height = this.bomService.getWindowHeight();
        this.bomService.windowResize()
            .subscribe(() => this.height = this.bomService.getWindowHeight());
    }
}