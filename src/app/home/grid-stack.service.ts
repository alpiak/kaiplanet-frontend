/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import "rxjs/add/observable/fromEvent";

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
        "wind-and-sand",
        "waterfall"
    ];
    private widgets: Widget[] = [
        { x: 0, y: 0, width: 12, height: 2, type: "header", zIndex: 3 },
        { x: 0, y: 2, width: 8, height: 2, type: "drawing-board" },
        { x: 8, y: 2, width: 3, height: 4, type: "weather-card" },
        { x: 0, y: 4, width: 2, height: 3, type: "wind-and-sand" },
        { x: 2, y: 4, width: 6, height: 3, type: "carousel", zIndex: 2 },
        { x: 8, y: 6, width: 3, height: 4, type: "plain" },
        { x: 0, y: 7, width: 8, height: 3, type: "moon-ocean" },
        { x: 11, y: 2, width: 1, height: 8, type: "waterfall" }
    ];
    private initObservable: Observable<any>;
    private initObservableSubscriber: Subscriber<any>;

    constructor() {
        this.initObservable = Observable.create((subscriber: Subscriber<any>) => {
            this.initObservableSubscriber = subscriber;
        });
    }

    getWidgetData(): Widget[] {
        return this.widgets;
    }
    init(el: HTMLElement, options: Object): void {
        this.gridStack = el;
        jQuery(this.gridStack).gridstack(options);
        this.initObservableSubscriber.next();
        this.initObservableSubscriber.complete();
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
                return this.initObservable;
            case "resizestop":
                return Observable.create((subscriber: Subscriber<any>) => {
                    jQuery(this.gridStack).on("resizestop", (event: Event) => {
                        subscriber.next(event);
                    });
                });
            case "resizestart":
                return Observable.create((subscriber: Subscriber<any>) => {
                    jQuery(this.gridStack).on("resizestart", (event: Event) => {
                        subscriber.next(event);
                    });
                });
            case "dragstart":
                return Observable.create((subscriber: Subscriber<any>) => {
                    jQuery(this.gridStack).on("dragstart", (event: Event) => {
                        subscriber.next(event);
                    });
                });
            case "dragstop":
                return Observable.create((subscriber: Subscriber<any>) => {
                    jQuery(this.gridStack).on("dragstop", (event: Event) => {
                        subscriber.next(event);
                    });
                });
        }
    }
}