/**
 * Created by qhyang on 2017/3/15.
 */

import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";

import { UserService } from "../user.service";
import { LocaleService } from "../locale.service";
import { GridStackService } from "../home/grid-stack.service";

import { AddWidgetDialogComponent } from "../home/add-widget-dialog.component";
import { LoginDialogComponent } from "../login-dialog.component";
import { WidgetComponent } from "./widget.component";

import { Widget, User } from "../interfaces";

const jQuery = require("jquery");

@Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./header-widget.component.scss") ]
})
export class HeaderWidgetComponent extends WidgetComponent implements OnInit, OnDestroy {
    private user: User;
    private currentLocale: string;
    private widgetTypes: Object;

    constructor(private userService: UserService, private localeService: LocaleService, protected gridStackService: GridStackService, private dialog: MdDialog, protected el:ElementRef) {
        super(gridStackService, el);
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
    ngOnDestroy() {
        this.gridStackService.leaveManageMode();
    }
    openLoginDialog() {
        this.dialog.open(LoginDialogComponent);
    }
    openAddWidgetDialog() {
        const dialogRef: MdDialogRef<AddWidgetDialogComponent> = this.dialog.open(AddWidgetDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.gridStackService.addWidget(result);
                setTimeout(() => {
                    this.gridStackService.enterManageMode();
                }, 200);
            }
        });
    }
    enterManageMode() {
        this.gridStackService.enterManageMode();
    }
    logOut() {
        this.userService.logOut();
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