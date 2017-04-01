/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";
import { share } from "rxjs/operator/share";

import { Injectable } from "@angular/core";

import { Widget } from "../../scripts/interfaces";

let jQuery = require("jquery");

@Injectable()
export class GridStackService {
    private gridStack: HTMLElement;
    private widgetTypes = [
        "plain",
        "header",
        "carousel",
        "drawing-board",
        "moon-ocean",
        "weather-card",
        "waterfall"
    ];
    private widgets: Widget[] = [
        { x: 0, y: 0, width: 12, height: 2, type: "header", zIndex: 3 },
        // { x: 0, y: 2, width: 8, height: 2, type: "drawing-board" },
        // { x: 8, y: 2, width: 3, height: 4, type: "weather-card" },
        { x: 0, y: 4, width: 2, height: 3, type: "plain", config: { type: "wind-and-sand" } },
        // { x: 2, y: 4, width: 6, height: 3, type: "carousel", zIndex: 2 },
        // { x: 8, y: 6, width: 3, height: 4, type: "plain" },
        // { x: 0, y: 7, width: 8, height: 3, type: "moon-ocean" },
        { x: 11, y: 2, width: 1, height: 8, type: "plain", config: { type: "random-walkers" } }
    ];
    private initSubject: Subject<any>;
    private resizeStartObservable: Observable<any>;
    private resizeStopObservable: Observable<any>;
    private dragStartObservable: Observable<any>;
    private dragStopObservable: Observable<any>;

    constructor() {
        this.initSubject = new Subject();
    }

    getWidgetData(): Widget[] {
        return this.widgets;
    }
    init(el: HTMLElement, options: Object): void {
        this.gridStack = el;
        jQuery(el).gridstack(options);
        this.resizeStartObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("resizestart", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.resizeStopObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("resizestop", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.dragStartObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("dragstart", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.dragStopObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("dragstop", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.initSubject.next();
        this.initSubject.complete();
    }
    getWidgetTypes(): string[] {
        return this.widgetTypes;
    }
    removeWidget(index: number): void {
        let $gridStackItem = jQuery(this.gridStack)
            .children("[data-index=" + index + "]")
            .fadeOut("fast", () => {
                jQuery(this.gridStack)
                    .data("gridstack")
                    .removeWidget($gridStackItem[0], false);
                this.widgets.splice(index, 1);
            });
    }
    on(eventType: string): Observable<any> {
        switch (eventType) {
            case "init":
                return this.initSubject;
            case "resizestart":
                return share.call(this.resizeStartObservable);
            case "resizestop":
                return share.call(this.resizeStopObservable);
            case "dragstart":
                return share.call(this.dragStartObservable);
            case "dragstop":
                return share.call(this.dragStopObservable);
        }
    }
}