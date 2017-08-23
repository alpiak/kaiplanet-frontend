/**
 * Created by qhyang on 2017/8/17.
 */

import { Injectable } from "@angular/core";
import { Headers, Http, URLSearchParams } from "@angular/http";
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
    getUserGridStackData():Observable<any> {
        return this.http.post(require("../config.json").urlBase + "/user/gridstack/get", null);
    }
    updateGridStackData(data: string) {
        let urlSearchParams = new URLSearchParams;

        urlSearchParams.set("data", data);

        this.http.post(require("../config.json").urlBase + "/user/gridstack/update", urlSearchParams.toString(), { headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})}).subscribe();
    }
}
