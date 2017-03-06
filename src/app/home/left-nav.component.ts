/**
 * Created by qhyang on 2017/3/6.
 */

import { Component, OnInit } from "@angular/core";

@Component({
    selector: "left-nav",
    template: require("./left-nav.component.pug")
})
export class leftNavComponent implements OnInit {
    ngOnInit() {
        const jQuery = require("jquery");
        require("metismenu");
        jQuery("#left-nav").metisMenu();
    }
}