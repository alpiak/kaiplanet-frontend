/**
 * Created by qhyang on 2017/3/13.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class ScrollSceneService {
    private controller: any;

    constructor() {

        // ScrollMagic
        require("gsap/tweenLite");
        let ScrollMagic = require("scrollmagic");
        require("../../scripts/animation.gsap");

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

    removeScene(scene: any) {
        this.controller.removeScene(scene);
    }

    destroy() {
        this.controller.destroy();
    }
}