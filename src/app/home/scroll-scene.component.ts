/**
 * Created by qhyang on 2017/3/1.
 */

import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "scroll-scene",
    template: require("./scroll-scene.component.pug"),
    styles: [ require("./scroll-scene.component.scss") ]
})
export class scrollSceneComponent implements OnInit {
    @Input()
    targetSelector: string;

    constructor() {

    }

    ngOnInit() {

        // ScrollMagic

        let ScrollMagic = require("scrollmagic");

        // init controller
        let controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter",
                duration: "1000"
            }
        });

        // build scenes
        new ScrollMagic.Scene({triggerElement: this.targetSelector})
            .setPin(this.targetSelector)
            .addTo(controller);

    }
}