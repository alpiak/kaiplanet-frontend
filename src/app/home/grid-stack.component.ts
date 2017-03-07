/**
 * Created by qhyang on 2017/3/7.
 */

import { Component, OnInit } from "@angular/core";
import "gridstack";
import "gridstack/dist/gridstack.css";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [require("./grid-stack.component.scss")]
})
export class gridStackComponent implements OnInit {
    ngOnInit() {
        let JQuery = require("jquery"),
            options = {
                acceptWidgets: true,
                cellHeight: "auto",
                verticalMargin: 10,
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                animate: true
            };
        JQuery(".grid-stack").gridstack(options);
    }
}