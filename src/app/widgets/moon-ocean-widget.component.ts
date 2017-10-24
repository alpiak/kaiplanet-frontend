/**
 * Created by qhyang on 2017/3/20.
 */

import { Component, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "moon-ocean-widget",
    template: require("./moon-ocean-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./moon-ocean-widget.component.scss") ]
})
export class MoonOceanWidgetComponent extends WidgetComponent {
    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }
}