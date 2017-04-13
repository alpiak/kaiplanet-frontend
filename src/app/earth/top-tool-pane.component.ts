/**
 * Created by qhyang on 2017/4/1.
 */

import { Component, OnInit } from "@angular/core";

import { LocaleService } from "../locale.service";

@Component({
    selector: "top-tool-pane",
    template: require("./top-tool-pane.component.pug"),
    styles: [ require("./top-tool-pane.component.scss") ]
})
export class TopToolPaneComponent implements OnInit{
    currentLocale: string;

    constructor(private localeService: LocaleService) { }

    ngOnInit() {
        this.currentLocale = this.localeService.currentLocale;
    }
    changeLocale(locale: string) {
        this.localeService.setLocale(locale);
        location.reload();
    }
}
