/**
 * Created by qhyang on 2017/3/21.
 */

import { Component } from "@angular/core";

@Component({
    selector: "waterfall-widget",
    template: require("./waterfall-widget.component.pug"),
    styles: [ require("./widget.component"), require("./waterfall-widget.component.scss") ]
})
export class WaterfallWidgetComponent { }