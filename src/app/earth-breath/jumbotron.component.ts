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

        // ScrollMagic
        require("gsap/tweenLite");
        let ScrollMagic = require("scrollmagic");
        require("../../script/animation.gsap");

        // init controller
        let controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter"
            }
        });

        // build scenes
        new ScrollMagic.Scene({
            duration: "600%"
        })
            .setPin("#scene")
            .addTo(controller);

        let jQuery = require("jquery");

        for (let i = 1; i <= 3; i++) {
            new ScrollMagic.Scene({
                duration: 100 / jQuery(".bubble-cluster-" + i).attr("data-depth") + "%"
            })
                .setTween(".bubble-cluster-" + i, {
                    top: "-100%"
                })
                .addTo(controller);
        }
        new ScrollMagic.Scene({
            duration: "220%"
        })
            .setTween("[crystal-nav]", {
                top: "-100%"
            })
            .addTo(controller);
    }
}