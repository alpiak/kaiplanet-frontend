/**
 * Created by qhyang on 2017/3/16.
 */

import { Component } from "@angular/core";

@Component({
    selector: "drawing-board-widget",
    template: require("./drawing-board-widget.component.pug"),
    styles: [ require("./widget.component"), require("./drawing-board-widget.component.scss") ]
})
export class DrawingBoardWidgetComponent { }