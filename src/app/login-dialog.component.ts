/**
 * Created by qhyang on 2017/8/15.
 */

import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";

@Component({
    selector: "login-dialog",
    template: require("./login-dialog.component.pug"),
    styles: [ require("./login-dialog.component.scss") ],
    providers: [ AuthService ]
})
export class LoginDialogComponent implements OnInit{
    private authMethods: Array<Object>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authMethods = this.authService.getOAuthMethods();
    }
}
