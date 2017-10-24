/**
 * Created by qhyang on 2017/8/16.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    private urlBase: string;

    constructor() {
        this.urlBase = require("../config.json").urlBase;
    }

    getOAuthMethods(): Array<Object> {
        return [
            {
                name: "baidu",
                displayName: "Baidu",
                description: "Use a Baidu account",
                icon: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
                loginPageUrl: this.urlBase + "/auth/baidu"
            }
        ];
    }
}
