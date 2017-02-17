/**
 * Created by qhyang on 2017/2/16.
 */

import "rxjs/add/operator/map";
import {Component, OnInit} from "@angular/core";

import { BomService } from "./bom.service";

@Component({
    selector: "jumbotron",
    template: `
        <ul class="scene" id="scene">
            <li class="layer background" [style.height] = "height + 'px'" data-depth="0.20"></li>
            <li class="layer mdl-grid" data-depth="0.40">
                <h1>Hello</h1>
            </li>
            <li class="layer" data-depth="0.60"></li>
            <li class="layer" data-depth="0.80"></li>
            <li class="layer" data-depth="1.00">
                <home-nav></home-nav>
            </li>
        </ul>
    `,
    styles: [require("./jumbotron.component.scss")]
})
export class JumbotronComponent implements OnInit{
    height: number;

    constructor(private bomService: BomService) {
        this.height = window.innerHeight - 100;
    }

    ngOnInit() {
        new Parallax(document.getElementById("scene"));
        this.bomService.windowResize()
            .map((event: any) => event.target.innerHeight)
            .subscribe((height: number) => this.height = height - 100);
    }
}