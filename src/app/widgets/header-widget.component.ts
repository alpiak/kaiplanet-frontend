/**
 * Created by qhyang on 2017/3/15.
 */

import { Component } from "@angular/core";

import { LocaleService } from "../locale.service";

@Component({
    selector: "header-widget",
    template: require("./header-widget.component.pug"),
    styles: [ require("./widget.component"), require("./header-widget.component.scss") ]
})
export class HeaderWidgetComponent {
    currentLocale: string;

    constructor(private localeService: LocaleService) {
        this.currentLocale = localeService.currentLocale;
    }

    openLoginDialog() {
        // TODO: remove after the login feature added
        setTimeout(() => alert("Login feature will be included in the next release!"), 300);
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