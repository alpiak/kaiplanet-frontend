/**
 * Created by qhyang on 2017/3/13.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class ScrollSceneService {
    private controller: Object;

    constructor() {

        // ScrollMagic
        require("gsap/tweenLite");
        let ScrollMagic = require("scrollmagic");
        require("../../script/animation.gsap");

        // init controller
        this.controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter"
            }
        });

    }

    addScene(scene: any) {
        scene.addTo(this.controller);
    }
}