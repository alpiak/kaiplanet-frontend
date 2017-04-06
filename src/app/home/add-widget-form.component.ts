/**
 * Created by qhyang on 2017/4/6.
 */

import { Component, Input } from "@angular/core";

@Component({
    selector: "add-widget-form",
    template: require("./add-widget-form.component.pug"),
    styles: [ require("./add-widget-form.component.scss") ]
})
export class AddWidgetFormComponent {
    @Input() widgetTypes: Object[];
}