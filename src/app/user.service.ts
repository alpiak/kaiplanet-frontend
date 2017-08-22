/**
 * Created by qhyang on 2017/8/17.
 */

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getUserInfo():Observable<any> {
        return this.http.post(require("../config.json").urlBase + "/user/info/get", null);
    }
    logOut() {
        this.http.post(require("../config.json").urlBase + "/user/logout", null).subscribe(function () {
            location.reload();
        });
    }
}
