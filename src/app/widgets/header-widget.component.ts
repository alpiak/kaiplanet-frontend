/**
 * Created by qhyang on 2017/3/15.
 */

import { Component, OnInit, ViewChild } from "@angular/core";

import { LocaleService } from "../locale.service";
import { GridStackService } from "../home/grid-stack.service";

import { AddWidgetFormComponent } from "../home/add-widget-form.component";

import { Widget } from "../../scripts/interfaces";

const jQuery = require("jquery");

    @Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component"), require("./header-widget.component.scss") ]
})
export class HeaderWidgetComponent implements OnInit{
    currentLocale: string;
    private widgetTypes: Object;
    @ViewChild(AddWidgetFormComponent) private addWidgetFormComponent: AddWidgetFormComponent;

    constructor(private localeService: LocaleService, private gridStackService: GridStackService) { }

    ngOnInit() {
        this.currentLocale = this.localeService.currentLocale;
        this.widgetTypes = this.gridStackService.getWidgetTypes();
    }
    openLoginDialog() {
        // TODO: remove after the login feature added
        setTimeout(() => alert("Login feature will be included in the next release!"), 300);
    }
    openAddWidgetDialog() {
        const dialogPolyfill = require("dialog-polyfill/dialog-polyfill.js");

        let dialog: any = jQuery("#hearder-widget__dialog").get(0);

        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        jQuery(dialog).find(".close").bind("click", () => {
            this.addWidgetFormComponent.clearConfig();
            dialog.close();
        });
    }
    addWidget(widget: Widget) {
        if (widget.x) {

        }
        this.gridStackService.addWidget(widget);
        this.addWidgetFormComponent.clearConfig();
        jQuery("#hearder-widget__dialog").get(0).close();
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