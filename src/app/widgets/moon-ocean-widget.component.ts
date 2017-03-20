/**
 * Created by qhyang on 2017/3/20.
 */

import { Component } from "@angular/core";

@Component({
    selector: "moon-ocean-widget",
    template: require("./moon-ocean-widget.component.pug"),
    styles: [ require("./widget.component"), require("./moon-ocean-widget.component.scss") ]
})
export class moonOceanWidgetComponent { }