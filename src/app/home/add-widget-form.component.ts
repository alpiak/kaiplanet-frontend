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
        this.config = {
            types: []
        };
        this.data = {};
    }

    getConfig(): Widget {
        let config = {};

        if (this.config["type"]) {
            config["type"] = this.config["type"];
        }
        if (this.config["types"].length) {
            config["types"] = [];
            for (let i = 0; i < this.config["types"].length; i++) {
                if (this.config["types"][i] === true) {
                    config["types"].push({
                        text: this.widgetTypes["sns"].config.types[i].text,
                        src: this.widgetTypes["sns"].config.types[i].src,
                        key: this.widgetTypes["sns"].config.types[i].key
                    });
                }
            }
        }

        return {
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            config: config
        };
    }
    clearConfig(): void {
        this.type = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.config = {
            types: []
        };
    }
}