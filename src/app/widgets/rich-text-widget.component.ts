/**
 * Created by qhyang on 2017/9/28.
 */

import { Component, OnInit, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "rich-text-widget",
    template: require("./rich-text-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./rich-text-widget.component.scss") ]
})
export class RichTextWidgetComponent extends WidgetComponent implements OnInit{
    constructor(gridStackService: GridStackService, el: ElementRef) { super(gridStackService, el); }

    ngOnInit () {
    }
}
