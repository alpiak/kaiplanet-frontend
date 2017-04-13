/**
 * Created by qhyang on 2017/2/21.
 */

import { Component, AfterViewInit } from "@angular/core";

@Component({
    template: require("./earth.component.pug")
})
export class EarthComponent implements AfterViewInit{
    ngAfterViewInit() {
        const jQuery = require("jquery");

        setTimeout(() => window["componentHandler"].upgradeElements(jQuery("body").get(0)), 200);
    }
}
