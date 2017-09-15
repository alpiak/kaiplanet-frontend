/**
 * Created by qhyang on 2017/3/21.
 */

import { Component, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "waterfall-widget",
    template: require("./waterfall-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./waterfall-widget.component.scss") ]
})
export class WaterfallWidgetComponent extends WidgetComponent {
    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }
}