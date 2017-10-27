/**
 * Created by qhyang on 2017/2/16.
 */

import "rxjs/add/operator/map";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { BomService } from "../bom.service";
import { LocaleService } from "../locale.service";

@Component({
    selector: "jumbotron",
    template: require("./jumbotron.component.pug"),
    styles: [ require("./jumbotron.component.scss") ]
})
export class JumbotronComponent implements OnInit, OnDestroy {
    height: number;
    width: number;
    parallax: Parallax;
    langClasses: any = {};

    constructor(private bomService: BomService, private localeService: LocaleService) { }

    ngOnInit() {
        this.height = this.bomService.getWindowHeight();
        this.parallax = new Parallax(document.getElementById("parallax-scene"));
        this.bomService.onWindowResize()
            .subscribe(() => this.height = this.bomService.getWindowHeight());

        switch (this.localeService.currentLocale) {
            case "en-US":
                this.langClasses.lang_en = true;
                break;
            case "zh-CN":
                this.langClasses.lang_zh = true;
                break;
            case "ja-JP":
                this.langClasses.lang_ja = true;
                break;
            default:
                this.langClasses.lang_en = true;
                break;
        }
    }

    ngOnDestroy() {
        if (this.parallax) {
            this.parallax.destroy();
        }
    }
}
