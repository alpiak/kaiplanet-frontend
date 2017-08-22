/**
 * Created by qhyang on 2017/3/15.
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { MdDialog } from "@angular/material";

import { UserService } from "../user.service";
import { LocaleService } from "../locale.service";
import { GridStackService } from "../home/grid-stack.service";

import { AddWidgetFormComponent } from "../home/add-widget-form.component";
import { LoginDialogComponent } from "../login-dialog.component";

import { Widget, User } from "../../scripts/interfaces";

const jQuery = require("jquery");

@Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component"), require("./header-widget.component.scss") ]
})
export class HeaderWidgetComponent implements OnInit{
    private user: User;
    private currentLocale: string;
    private widgetTypes: Object;
    @ViewChild(AddWidgetFormComponent) private addWidgetFormComponent: AddWidgetFormComponent;

    constructor(private userService: UserService, private localeService: LocaleService, private gridStackService: GridStackService, private dialog: MdDialog) {
        this.currentLocale = localeService.currentLocale;
    }

    ngOnInit() {
        this.widgetTypes = this.gridStackService.getWidgetTypes();
        this.userService.getUserInfo().subscribe((res) => {
            res = res.json();
            if (res.code === 1) {
                this.user = res.data;
            }
        });
    }
    openLoginDialog() {
        this.dialog.open(LoginDialogComponent);
    }
    openAddWidgetDialog() {
        const dialogPolyfill = require("dialog-polyfill/dialog-polyfill.js");

        let dialog: any = jQuery("#header-widget__dialog").get(0);

        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        jQuery(dialog).find(".close").bind("click", () => {
            this.addWidgetFormComponent.clearConfig();
            dialog.close();
        });
    }
    enterManageMode() {
        this.gridStackService.enterManageMode();
    }
    logOut() {
        this.userService.logOut();
    }
    addWidget(widget: Widget) {
        if ((widget.x ? /^[0-9]?$/.test(widget.x.toString()) : true) && (widget.y ? /^[0-9]?$/.test(widget.y.toString()) : true) && (widget.width ? /^[0-9]?$/.test(widget.width.toString()) : true) && (widget.height ? /^[0-9]?$/.test(widget.height.toString()) : true) && (widget.zIndex ? /^[0-9]*$/.test(widget.zIndex.toString()) : true)) {
            this.gridStackService.addWidget(widget);
            this.addWidgetFormComponent.clearConfig();
            jQuery("#header-widget__dialog").get(0).close();
        }
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