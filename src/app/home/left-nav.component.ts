/**
 * Created by qhyang on 2017/3/6.
 */

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoadingService } from "../loading.service";

@Component({
    selector: "left-nav",
    template: require("./left-nav.component.pug"),
    styles: [ require("./left-nav.component.scss") ]
})
export class leftNavComponent implements OnInit {
    constructor(private loadingService: LoadingService, private router: Router) { }

    ngOnInit() {
        const jQuery = require("jquery");

        require("../../styles/stairway-hover-nav");
        require("../../scripts/stairway-hover-nav");

        jQuery("#left-nav").stairwayNav({
            stairs: 2
        });
    }

    routeTo(link: string) {
        this.loadingService.start(() => {
            this.router.navigate([ link ]);
        });
    }
}