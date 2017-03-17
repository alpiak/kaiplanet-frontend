/**
 * Created by qhyang on 2017/3/7.
 */

import { Compiler, Component, NgModuleFactory, AfterViewInit } from "@angular/core";

import "gridstack";
import "gridstack/dist/gridstack.css";

import { WidgetsModule } from "../widgets/widgets.module";

import { GridStackService } from "./grid-stack.service";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [ require("./grid-stack.component.scss") ]
})
export class gridStackComponent implements AfterViewInit {
    widgets: Object[];
    widgetsModule: NgModuleFactory<any>;

    constructor(compiler: Compiler, private gridStackService: GridStackService) {
        this.widgets = gridStackService.getWidgetsData();
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
    }

    ngAfterViewInit() {
        let options = {
                acceptWidgets: true,
                cellHeight: "auto",
                verticalMargin: 10,
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                animate: true,
                handle: ".grid-stack-item-actions",
                removable: true
            };

        this.gridStackService.init(options);
    }
}
