/**
 * Created by qhyang on 2017/3/15.
 */

import { Component, OnInit } from "@angular/core";

import { LocaleService } from "../locale.service";
import { GridStackService } from "../home/grid-stack.service";

@Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component"), require("./header-widget.component.scss") ]
})
export class HeaderWidgetComponent implements OnInit{
    currentLocale: string;
    private widgetTypes: Object[];

    constructor(private localeService: LocaleService, private gridStackService: GridStackService) {
        this.currentLocale = localeService.currentLocale;
    }

    ngOnInit() {
        this.widgetTypes = this.gridStackService.getWidgetTypes();
    }
    openLoginDialog() {
        // TODO: remove after the login feature added
        setTimeout(() => alert("Login feature will be included in the next release!"), 300);
    }
    openAddWidgetDialog() {
        const jQuery = require("jquery"),
            dialogPolyfill = require("dialog-polyfill/dialog-polyfill.js");

        let dialog: any = jQuery("#hearder-widget__dialog").get(0);

        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        jQuery(dialog).find(".close").bind("click", () => dialog.close());
    }
    addWidget(config: Object) {

    }
    changeLocale(locale: string) {
        this.localeService.setLocale(locale);
        location.reload();
    }
    openThemeDialog() {
        // TODO: remove after the login feature added
        setTimeout(() => alert("Theming feature will be included in the next release!"), 300);
    }
}