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
    private widgetTypes = [
        "plain",
        "header",
        "carousel",
        "drawing-board",
        "moon-ocean",
        "weather-card",
        "wind-and-sand",
        "waterfall"
    ];
    private widgets = [
        { x: 0, y: 0, width: 12, height: 2, type: "header", zIndex: 3 },
        // { x: 0, y: 2, width: 8, height: 2, type: "drawing-board" },
        // { x: 8, y: 2, width: 3, height: 4, type: "weather-card" },
        // { x: 0, y: 4, width: 2, height: 3, type: "wind-and-sand" },
        // { x: 2, y: 4, width: 6, height: 3, type: "carousel", zIndex: 2 },
        { x: 8, y: 6, width: 3, height: 4, type: "plain" },
        // { x: 0, y: 7, width: 8, height: 3, type: "moon-ocean" },
        // { x: 11, y: 2, width: 1, height: 8, type: "waterfall" }
    ];

    getWidgetsData(): Object[] {
        return this.widgets;
    }
    init(el: HTMLElement, options: Object): void {
        JQuery(el).gridstack(options);
    }
    getWidgetTypes(): string[] {
        return this.widgetTypes;
    }
    on(eventType: string): Observable<any> {
        switch (eventType) {
            case "resizestop":
                return Observable.create(function (subscriber: Subscriber<any>) {
                    JQuery('.grid-stack').on("resizestop", function(event: Event) {
                        subscriber.next(event);
                    });
                });
            case "resizestart":
                return Observable.create(function (subscriber: Subscriber<any>) {
                    JQuery('.grid-stack').on("resizestart", function(event: Event) {
                        subscriber.next(event);
                    });
                });
            case "dragstart":
                return Observable.create(function (subscriber: Subscriber<any>) {
                    JQuery('.grid-stack').on("dragstart", function(event: Event) {
                        subscriber.next(event);
                    });
                });
            case "dragstop":
                return Observable.create(function (subscriber: Subscriber<any>) {
                    JQuery('.grid-stack').on("dragstop", function(event: Event) {
                        subscriber.next(event);
                    });
                });
        }
    }
}