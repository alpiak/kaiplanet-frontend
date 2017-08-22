/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";
import { share } from "rxjs/operator/share";

import { Injectable } from "@angular/core";
import { MdSnackBar } from "@angular/material";

import { Widget } from "../../scripts/interfaces";

import { UserService } from "../user.service";

let jQuery = require("jquery");

@Injectable()
export class GridStackService {
    private gridStack: HTMLElement;
    private widgetTypes = {
        plain: {
            text: "Plain",
            id: "plain",
            config: {
                types: [
                    {
                        text: "Wind and sand",
                        id: "wind-and-sand"
                    },
                    {
                        text: "Random walkers",
                        id: "random-walkers"
                    }
                ]
            }
        },
        carousel: {
            text: "Carousel",
            id: "carousel"
        },
        drawingBoard: {
            text: "Drawing board",
            id: "drawing-board"
        },
        moonOcean: {
            text: "Moon and Ocean",
            id: "moon-ocean"
        },
        weatherCard: {
            text: "Weather card",
            id: "weather-card"
        },
        sns: {
            text: "SNS",
            id: "sns",
            config: {
                types: [
                    {
                        text: "Weibo",
                        src: "https://passport.weibo.cn/signin/welcome",
                        id: "weibo"
                    },
                    {
                        text: "Mop",
                        src: "http://m.mop.com/login.html",
                        id: "mop"
                    }
                ]
            }
        },
        waterfall: {
            text: "Waterfall",
            id: "waterfall"
        }
    };
    private widgets: Widget[];
    private prepareSubject: Subject<any>;
    private initSubject: Subject<any>;
    private updateSubject: Subject<any>;
    private enterManageModeSubject: Subject<any>;
    private leaveManageModeSubject: Subject<any>;
    private resizeStartObservable: Observable<any>;
    private resizeStopObservable: Observable<any>;
    private dragStartObservable: Observable<any>;
    private dragStopObservable: Observable<any>;

    constructor(private userService: UserService, private snackBar: MdSnackBar) {
        this.prepareSubject = new Subject();
        this.initSubject = new Subject();
        this.updateSubject = new Subject();
        this.enterManageModeSubject = new Subject();
        this.leaveManageModeSubject = new Subject();
    }

    getWidgetData(): Widget[] {
        return this.widgets;
    }
    prepare() {
        this.userService.getUserInfo().subscribe((res:any) => {
            res = res.json();
            if (res.code === 1) {
                if (res.data.gridStackData) {
                    this.widgets = JSON.parse(res.data.gridStackData);
                } else {

                }
            } else if (res.code === -1) {
                this.widgets = [{"x":0,"y":0,"width":12,"height":2,"type":"header","zIndex":3},{"x":0,"y":2,"width":8,"height":2,"type":"drawing-board","data":{"imgUrl":"data:image/png;base64,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WHOtt361U4C2tfnVn5qRAAmQgCUCdIIsgWW3JEACJEACJBCZwJrPAD2/8O6m8Wqg9e7Iw7ADEiABEigaATpBRbM49SUBEiABEnCHgKTGlhTZXqX1LqBxvjv6UFISIAESyAgBOkEZMQTFIAESIAESIIEjCOxcCayYA9QAGDj0l8r/lv/VvhUYUU9wJEACJEACAQnQCQoIjNVJgARIgARIIBECT04H9m3yHmrMLODczkRE4SAkQAIkkDcCdILyZlHqQwIkQAIkkA8CS0YDA+UtoCEqyY5Q8wJg2sJ86EotSIAESCBhAnSCEgbO4UiABEiABEjAiMDiWv9qMx4AGi4z6oqVSIAESIAEjiRAJ4gzggRIgARIgASySEBzgubtyaLUlIkESIAEnCBAJ8gJM1FIEiABEiCBwhFYUns4IcJQ5WtqgLm7C4eECpMACZBAXAToBMVFkv2QAAmQAAmQQJwElrcCe7uq9zj6VOC8Z+McjX2RAAmQQKEI0AkqlLmpLAmQAAmQgFMEnpoJ7Fl/OEGCJEQYdQrQ9rxTalBYEiABEsgaATpBWbMI5SEBEiABEiABEiABEiABErBKgE6QVbzsnARIgARIgARIgARIgARIIGsE6ARlzSKUhwRIgARIgARIgARIgARIwCoBOkFW8bJzEiABEiABEiABEiABEiCBrBGgE5Q1i1AeEiABEiABEiABEiABEiABqwToBFnFy85JgARIgARIgARIgARIgASyRoBOUNYsQnlIgARIgARIgARIgARIgASsEqATZBUvOycBEiABEiABEiABEiABEsgaATpBWbMI5SEBEiABEiABEiABEiABErBKgE6QVbzsnARIgARIgARIgARIgARIIGsE6ARlzSKUhwRIgARIgARIgARIgARIwCoBOkFW8bJzEiABEiABEiABEiABEiCBrBGgE5Q1i1AeEiABEiABEiABEiABEiABqwToBFnFy85JgARIgARIgARIgARIgASyRoBOUNYsQnlIgARIgARIgARIgARIgASsEqATZBUvOycBEiABEiABEiABEiABEsgagf8PBI3N5JERNCAAAAAASUVORK5CYII="}},{"x":8,"y":2,"width":3,"height":4,"type":"weather-card"},{"x":0,"y":4,"width":2,"height":3,"type":"plain","config":{"type":"wind-and-sand"}},{"x":2,"y":4,"width":6,"height":3,"type":"carousel","zIndex":2},{"x":8,"y":6,"width":3,"height":4,"type":"sns","config":{"types":[{"id":"weibo","text":"Weibo","src":"https://passport.weibo.cn/signin/welcome"},{"id":"mop","text":"Mop","src":"http://3g3.mop.com/login.html"}]}},{"x":0,"y":7,"width":8,"height":3,"type":"moon-ocean"},{"x":11,"y":2,"width":1,"height":8,"type":"plain","config":{"type":"random-walkers"}}];
            }
            this.prepareSubject.next();
            this.prepareSubject.complete();
        });
    }
    init(el: HTMLElement, options: Object): void {
        this.gridStack = el;
        jQuery(el).addClass("static").gridstack(options);
        window["componentHandler"].upgradeElements(el);
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
    getWidgetTypes(): any {
        return this.widgetTypes;
    }
    removeWidget(index: number): void {
        this.updateSubject.next({ remove: [ index ] });

        let $gridStackItem = jQuery(this.gridStack)
            .children("[data-index=" + index + "]")
            .fadeOut("fast", () => {
                jQuery(this.gridStack)
                    .data("gridstack")
                    .removeWidget($gridStackItem[0], false);
                this.widgets.splice(index, 1);
            });
    }
    addWidget(widget: Widget): number {
        let len = this.widgets.push(widget);

        setTimeout(() => {
            jQuery(this.gridStack)
                .children(".grid-stack-item")
                .last()
                .find("button, ul")
                .each(function () {
                    window["componentHandler"].upgradeElement(this);
                });
            jQuery(this.gridStack)
                .data("gridstack")
                .makeWidget(
                    jQuery(this.gridStack)
                        .children(".grid-stack-item")
                        .last()
                        .get(0)
                );
            this.updateGridStackData();
        }, 200);
        this.updateSubject.next({ add: [ len - 1 ] });

        return len - 1;
    }
    enterManageMode() {
        jQuery(this.gridStack)
            .removeClass("static")
            .data("gridstack")
            .enable();
        let snackBarRef = this.snackBar.open("Click \"Finish\" to apply the changes", "Finish");
        this.enterManageModeSubject.next();
        snackBarRef.onAction().subscribe(() => {
            this.leaveManageMode();
            snackBarRef.dismiss();
            this.updateGridStackData();
        });
    }
    leaveManageMode() {
        jQuery(this.gridStack)
            .addClass("static")
            .data("gridstack")
            .disable();
        this.leaveManageModeSubject.next();
    }
    updateGridStackData() {
        jQuery(this.gridStack)
            .children(".grid-stack-item")
            .each((index:number, el:HTMLElement) => {
                this.widgets[index].x = jQuery(el).attr("data-gs-x");
                this.widgets[index].y = jQuery(el).attr("data-gs-y");
                this.widgets[index].width = jQuery(el).attr("data-gs-width");
                this.widgets[index].height = jQuery(el).attr("data-gs-height");
            });
        console.log(this.widgets);
    }
    on(eventType: string): Observable<any> {
        switch (eventType) {
            case "prepare":
                return this.prepareSubject;
            case "init":
                return this.initSubject;
            case "update":
                return this.updateSubject;
            case "entermanagemode":
                return this.enterManageModeSubject;
            case "leavemanagemode":
                return this.leaveManageModeSubject;
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
