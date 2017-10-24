/**
 * Created by qhyang on 2017/3/15.
 */

import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";

import { UserService } from "../user.service";
import { LocaleService } from "../locale.service";
import { GridStackService } from "../home/grid-stack.service";

import { WidgetComponent } from "./widget.component";
import { AddWidgetDialogComponent } from "../home/add-widget-dialog.component";
import { LoginDialogComponent } from "../login-dialog.component";
import { UserProfileDialogComponent } from "../home/user-profile-dialog.component";

import {  User } from "../interfaces";

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
        this.currentLocale = this.localeService.currentLocale;
        this.widgetTypes = this.gridStackService.getWidgetTypes();
        this.userService.getUserInfo().subscribe((data) => {
            if (data) {
                this.user = data;
            }
        });
        this.userService.onUpdate().subscribe((data) => {
            this.user = data;
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
            //TODO: add error handler
        });
    }

    openUserProfileDialog() {
        const dialogRef: MdDialogRef<UserProfileDialogComponent> = this.dialog.open(UserProfileDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.updateUserInfo(result).subscribe();
            }
            //TODO: add error handler
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