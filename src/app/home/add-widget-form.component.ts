/**
 * Created by qhyang on 2017/4/6.
 */

import { Component, Input } from "@angular/core";

import { Widget } from "../../scripts/interfaces";

@Component({
    selector: "add-widget-form",
    template: require("./add-widget-form.component.pug"),
    styles: [ require("./add-widget-form.component.scss") ]
})
export class AddWidgetFormComponent {
    @Input() widgetTypes: Object;
    private type: string;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private zIndex: number;
    private config: Object;
    private data: Object;

    constructor() {
        this.config = {};
        this.data = {};
    }

    getConfig(): Widget {
        return {
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            config: this.config
        };
    }
    clearConfig(): void {
        this.type = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.config = {};
    }
}