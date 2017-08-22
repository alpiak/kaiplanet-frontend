/**
 * Created by qhyang on 2017/3/7.
 */

import { Compiler, Component, NgModuleFactory, AfterViewInit } from "@angular/core";

import "gridstack";
import "gridstack/dist/gridstack.css";

import { WidgetsModule } from "../widgets/widgets.module";

import { GridStackService } from "./grid-stack.service";

import { Widget } from "../../scripts/interfaces";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [ require("./grid-stack.component.scss") ]
})
export class gridStackComponent implements AfterViewInit {
    widgets: Widget[];
    widgetsModule: NgModuleFactory<any>;

    constructor(compiler: Compiler, private gridStackService: GridStackService) {
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
    }

    ngAfterViewInit() {
        let jQuery = require("jquery");

        this.gridStackService.on("init").subscribe(() => {
            this.gridStackService.on("resizestart").subscribe((event) => {
                jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
            });
            this.gridStackService.on("resizestop").subscribe((event) => {
                jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
            });
            this.gridStackService.on("dragstart").subscribe((event) => {
                jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
            });
            this.gridStackService.on("dragstop").subscribe((event) => {
                jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
            });
        });

        let options = {
            acceptWidgets: true,
            cellHeight: "auto",
            verticalMargin: 10,
            alwaysShowResizeHandle: true,
            animate: true,
            disableDrag: true,
            disableResize: true,
            handle: ".grid-stack-item-handle",
            removable: true
        };

        this.gridStackService.on("prepare").subscribe(() => {
            this.widgets = this.gridStackService.getWidgetData();
            setTimeout(() => {
                this.gridStackService.init(jQuery(".grid-stack").get(0), options);
            }, 200);
        });
        this.gridStackService.prepare();
    }
    onClose(index: number) {
        if (this.widgets[index].type !== "header") {
            this.gridStackService.removeWidget(index);
        }
    }
}
