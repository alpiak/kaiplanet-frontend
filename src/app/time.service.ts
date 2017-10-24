/**
 * Created by qhyang on 2017/8/25.
 */

import { Observable } from "rxjs";
import { Subscriber } from "rxjs/Subscriber";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class TimeService {
    constructor(private http: Http) { }

    getCurrentServerTime(): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            this.http.post(require("../config.json").urlBase + "/time", null).subscribe((res: any) => {
                subscriber.next(res.json().data);
            });
        });
    }
}
