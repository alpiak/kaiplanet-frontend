/**
 * Created by qhyang on 2017/3/15.
 */

import { Component } from "@angular/core";

@Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component"), require("./header-widget.component.scss") ]
})
export class headerWidgetComponent {
    logIn() {
        // TODO: remove after the login feature added
        setTimeout(() => alert("login feature will be included in the next release!"), 300);
    }
}