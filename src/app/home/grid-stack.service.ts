/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import "rxjs/add/observable/fromEvent";
import { Injectable } from "@angular/core";

let JQuery = require("jquery");

@Injectable()
export class GridStackService {
    widgets = [
        { x: 0, y: 0, width: 8, height: 2, type: "plain" },
        { x: 8, y: 0, width: 3, height: 4, type: "plain" },
        { x: 0, y: 2, width: 2, height: 3, type: "plain" },
        { x: 2, y: 2, width: 6, height: 3, type: "carousel" },
        { x: 8, y: 0, width: 3, height: 4, type: "plain" },
        { x: 0, y: 5, width: 8, height: 3, type: "plain" },
        { x: 11, y: 0, width: 1, height: 8, type: "plain" }
    ];

    getWidgetsData() {
        return this.widgets;
    }
    init(options: Object): void {
        JQuery(".grid-stack").gridstack(options);
    }
    on(eventType: string): Observable<any> {
        if (eventType === "resizeStop") {
            return Observable.create(function (subscriber: Subscriber<any>) {
                JQuery('.grid-stack').on('resizestop', function(event: Event) {
                    subscriber.next(event.target);
                });
            });
        }
    }
}