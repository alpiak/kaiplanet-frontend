/**
 * Created by qhyang on 2017/2/17.
 */

import {Component, OnInit} from "@angular/core";

@Component({
    selector: "crystal-nav",
    template: require("./crystal-nav.component.pug"),
    styles: [require("./crystal-nav.component.scss")]
})
export class CrystalNavComponent implements OnInit {
    ngOnInit() {
        let jquery = require("jquery");
        require("jquery.ripples");
        jquery(".ripple").ripples();
    }
}