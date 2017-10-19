/**
 * Created by qhyang on 2017/8/17.
 */

import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";

import { Injectable } from "@angular/core";
import { Headers, Http, URLSearchParams } from "@angular/http";

@Injectable()
export class UserService {
    private user: any;
    private updateSubject: Subject<any> = new Subject();

    constructor(private http: Http) { }

    getUserInfo():Observable<any> {
        if (this.user) {
            const jQuery = require("jquery");

            return Observable.create((subscriber: Subscriber<any>) => {
                subscriber.next(jQuery.extend(true, [], this.user));
                subscriber.complete();
            });
        }
        return Observable.create((subscriber: Subscriber<any>) => {
            this.http.post(require("../config.json").urlBase + "/user/info/get", null).subscribe((res: any) => {
                res = res.json();

                if (res.code === 1) {
                    this.user = res.data;
                    subscriber.next(res.data);
                    subscriber.complete();
                } else {
                    //TODO: add error handler
                }
            });
        });
    }

    updateUserInfo(data: any):Observable<any> {
        let urlSearchParams = new URLSearchParams;

        urlSearchParams.append("nickname", data.nickName);
        urlSearchParams.append("birthday", data.birthday);
        urlSearchParams.append("gender", data.gender);

        return Observable.create((subscriber: Subscriber<any>) => {
            return this.http.post(require("../config.json").urlBase + "/user/info/update", urlSearchParams.toString(), { headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})}).subscribe((res: any) => {
                res = res.json();

                if (res.code === 1) {
                    this.user = data;
                    this.updateSubject.next(data);
                } else {
                    //TODO: add error handler
                }
            });
        });
    }

    logOut() {
        this.http.post(require("../config.json").urlBase + "/user/logout", null).subscribe(function () {
            location.reload();
        });
    }

    getUserGridStackData():Observable<any> {
        return this.http.post(require("../config.json").urlBase + "/user/gridstack/get", null);
    }

    updateGridStackData(data: string):Observable<any> {
        let urlSearchParams = new URLSearchParams;

        urlSearchParams.set("data", data);

        return this.http.post(require("../config.json").urlBase + "/user/gridstack/update", urlSearchParams.toString(), { headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})});
    }


    onUpdate() {
        return this.updateSubject;
    }
}
