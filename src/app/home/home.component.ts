/**
 * Created by qhyang on 2017/3/6.
 */

import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    template: require("./home.component.pug"),
    styles: [ require("./home.component.scss") ]
})
export class HomeComponent implements OnInit, OnDestroy {
    private meny: any;

    ngOnInit() {
        const Meny = require("../../scripts/meny");

        this.meny = Meny.create({
            // The element that will be animated in from off screen
            menuElement: document.querySelector(".meny"),

            // The contents that gets pushed aside while Meny is active
            contentsElement: document.querySelector(".contents"),

            // The alignment of the menu (top/right/bottom/left)
            position: "left",

            // The height of the menu (when using top/bottom position)
            height: 200,

            // The width of the menu (when using left/right position)
            width: 260,

            // The angle at which the contents will rotate to.
            angle: 30,

            // The mouse distance from menu position which can trigger menu to open.
            threshold: 40,

            // Width(in px) of the thin line you see on screen when menu is in closed position.
            overlap: 6,

            // The total time taken by menu animation.
            transitionDuration: "0.5s",

            // Transition style for menu animations
            transitionEasing: "ease",

            // Gradient overlay for the contents
            gradient: "rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.65) 100%)",

            // Use mouse movement to automatically open/close
            mouse: true,

            // Use touch swipe events to open/close
            touch: true
        });

        const jQuery = require("jquery"),
            triggerWindowResize = () => {
                let e = document.createEvent("Event");

                e.initEvent("resize", true, true);
                window.dispatchEvent(e);
                setTimeout(() => {
                    window.dispatchEvent(e);
                }, 200);
            },
            onWindowResize = () => {
                this.meny.addEventListener("closed", triggerWindowResize);
            };

        this.meny.addEventListener( "open", () => {
            // do something on open

            jQuery(window).one("resize", onWindowResize);

            this.meny.removeEventListener("closed", triggerWindowResize);
        });


        this.meny.addEventListener( "closed", () => {
            // do something right after meny is closed and transitions finished

            jQuery(window).unbind("resize", onWindowResize);
        });
    }

    ngOnDestroy() {
        this.meny.destroy();
    }
}