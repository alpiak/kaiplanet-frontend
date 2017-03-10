/**
 * Created by qhyang on 2017/3/7.
 */

import { Compiler, Component, NgModuleFactory, AfterViewInit } from "@angular/core";

import "gridstack";
import "gridstack/dist/gridstack.css";

import { WidgetsModule } from "../widgets/widgets.module";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [require("./grid-stack.component.scss")]
})
export class gridStackComponent implements AfterViewInit {
    gridStackItems = [
        { x: 0, y: 0, width: 8, height: 2, type: "plain" },
        { x: 8, y: 0, width: 3, height: 4, type: "plain" },
        { x: 0, y: 2, width: 2, height: 3, type: "plain" },
        { x: 2, y: 2, width: 6, height: 3, type: "carousel" },
        { x: 8, y: 0, width: 3, height: 4, type: "plain" },
        { x: 0, y: 5, width: 8, height: 3, type: "plain" },
        { x: 11, y: 0, width: 1, height: 8, type: "plain" }
    ];
    widgetsModule: NgModuleFactory<any>;

    constructor(compiler: Compiler) {
        for (let item of this.gridStackItems) {
                this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
        }
    }

    ngAfterViewInit() {
        let JQuery = require("jquery"),

            options = {
                acceptWidgets: true,
                cellHeight: "auto",
                verticalMargin: 10,
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                animate: true,
                handle: ".grid-stack-item-handle",
                removable: true
            };

        JQuery(".grid-stack").gridstack(options);
    }
}
