/**
 * Created by qhyang on 2017/4/1.
 */

import { Component, AfterViewInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "plain-widget",
    template: require("./plain-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./plain-widget.component.scss") ]
})
export class PlainWidgetComponent extends WidgetComponent implements AfterViewInit {
    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }
}
