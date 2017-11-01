/**
 * Created by qhyang on 2017/2/17.
 */

import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { LoadingService } from "../loading.service";

@Component({
    selector: "[crystal-nav]",
    template: require("./crystal-nav.component.pug"),
    styles: [require("./crystal-nav.component.scss")]
})
export class CrystalNavComponent {
    constructor(private loadingService: LoadingService, private router: Router) { }

    routeTo(link: string) {
        this.loadingService.start(() => {
            this.router.navigate([ link ]);
        });
    }
}