/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";
import { share } from "rxjs/operator/share";

import { Injectable } from "@angular/core";
import { MdSnackBar, MdSnackBarRef } from "@angular/material";

import { Widget } from "../interfaces";

import { UserService } from "../user.service";

let jQuery = require("jquery");

@Injectable()
export class GridStackService {
    private gridStackEl: HTMLElement;
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
        richText: {
            text: "Rich text",
            id: "rich-text"
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
                        src: "http://m.mop.com/passport.html?targetUrl=//3g3.mop.com/hi/index.html#/loginByAccount",
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
    private isInit: boolean = false;
    private initSubject: Subject<any> = new Subject();
    private updateSubject: Subject<any> = new Subject();
    private enterManageModeSubject: Subject<any> = new Subject();
    private leaveManageModeSubject: Subject<any> = new Subject();
    private resizeStartObservable: Observable<any>;
    private resizeStopObservable: Observable<any>;
    private dragStartObservable: Observable<any>;
    private dragStopObservable: Observable<any>;
    private snackBarRef: MdSnackBarRef<any>;

    constructor(private userService: UserService, private snackBar: MdSnackBar) { }

    getWidgetData(): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            if (this.widgets.length) {
                subscriber.next(jQuery.extend(true, [], this.widgets));
                subscriber.complete();
            } else {
                this.prepare().subscribe(() => {
                    subscriber.next(jQuery.extend(true, [], this.widgets));
                    subscriber.complete();
                });
            }
        });
    }
    prepare() {
        return Observable.create((subscriber: Subscriber<any>) => {
            this.userService.getUserGridStackData().subscribe((res:any) => {
                res = res.json();
                if (res.code === 1) {
                    this.widgets = JSON.parse(res.data);
                } else if (res.code === -1) {
                    this.widgets = JSON.parse("[{\"x\":\"0\",\"y\":\"0\",\"width\":\"12\",\"height\":\"2\",\"type\":\"header\",\"zIndex\":3,\"config\":{\"background\":{\"color\":\"\",\"images\":[{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/fd3081c6c60cceccf9d1decadf7ec1fa_34.jpg\",\"title\":\"34.jpg\"}]}},\"data\":{}},{\"type\":\"weather-card\",\"x\":\"9\",\"y\":\"2\",\"width\":\"3\",\"height\":\"4\",\"zIndex\":0},{\"type\":\"drawing-board\",\"x\":\"0\",\"y\":\"2\",\"width\":\"5\",\"height\":\"2\",\"zIndex\":0,\"config\":{\"background\":{\"images\":[],\"color\":\"rgba(241,241,241,0.54)\"},\"type\":\"wind-and-sand\"},\"data\":{\"imgUrl\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/4_2_drawingboard.png\"}},{\"type\":\"carousel\",\"x\":\"3\",\"y\":\"5\",\"width\":\"6\",\"height\":\"3\",\"zIndex\":1,\"config\":{\"background\":{\"images\":[],\"color\":\"rgba(231,236,238,1)\"},\"type\":\"wind-and-sand\"},\"data\":{\"images\":[{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/0500c4acddbb2c612ba06bd5edd947bb_screenshot2.jpg\",\"title\":\"screenshot2.jpg\"},{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/c60f08d8a3e8c079b7b2b5cad0879bd9_screenshot2.jpg\",\"title\":\"screenshot2.jpg\"},{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/b3cf9121ffab0c05936d9d7ea641b904_19.jpg\",\"title\":\"19.jpg\"}],\"linkUrl\":\"/earth\"}},{\"x\":\"5\",\"y\":\"2\",\"width\":\"4\",\"height\":\"3\",\"type\":\"rich-text\",\"zIndex\":0,\"config\":{\"background\":{\"color\":\"rgba(235,227,148,0.571875)\"}},\"data\":{\"text\":{\"ops\":[{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"size\":\"large\",\"font\":\"mirza\",\"color\":\"#0066cc\"},\"insert\":\"Welcome!\"},{\"attributes\":{\"size\":\"large\",\"font\":\"ubuntu\"},\"insert\":\"😝\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"inconsolata\"},\"insert\":\"this is a little site from a \"},{\"attributes\":{\"font\":\"inconsolata\",\"color\":\"#0066cc\",\"bold\":true},\"insert\":\"front-end \"},{\"attributes\":{\"font\":\"inconsolata\"},\"insert\":\"developer💻🍺\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"inconsolata\"},\"insert\":\"though there is not much to be showed here now\"},{\"attributes\":{\"font\":\"inconsolata\",\"size\":\"large\"},\"insert\":\"🤔\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"ubuntu\"},\"insert\":\"I'm going to create something \"},{\"attributes\":{\"font\":\"ubuntu\",\"color\":\"#9933ff\",\"size\":\"large\"},\"insert\":\"fantastic\"},{\"attributes\":{\"font\":\"ubuntu\",\"size\":\"large\"},\"insert\":\"🌈\"},{\"attributes\":{\"font\":\"ubuntu\"},\"insert\":\" here\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"ubuntu\"},\"insert\":\"whatever😽, most important, I wish you\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"ubuntu\",\"color\":\"#0066cc\",\"size\":\"large\"},\"insert\":{\"image\":\"data:image/png;base64,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\"}},{\"attributes\":{\"font\":\"ubuntu\",\"color\":\"#0066cc\",\"size\":\"large\"},\"insert\":\" have fun!\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"}]}}}]");
                }
                subscriber.next(jQuery.extend(true, [], this.widgets));
                subscriber.complete();
            });
        });
    }

    init(el: HTMLElement, options: Object): Observable<any> {
        this.gridStackEl = el;
        jQuery(el).addClass("static")

            //TODO: remove when the gridstack customization feature added
            .css({
                "max-width": "1438px",
                "margin-left": "auto",
                "margin-right": "auto"
            })

            .gridstack(options);


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
        this.isInit = true;
        this.initSubject.next();
        this.initSubject.complete();

        return Observable.create((subscriber: Subscriber<any>) => {
            subscriber.next();
            subscriber.complete();
        });
    }

    destroy() {
        this.leaveManageMode();
        jQuery(this.gridStackEl).off("resizestart resizestop dragstart dragstop");
        this.widgets = [];
    }

    getWidgetTypes(): any {
        return this.widgetTypes;
    }

    removeWidget(index: number): void {
        this.updateSubject.next({ remove: [ index ] });

        let $gridStackItem = jQuery(this.gridStackEl)
            .children("[data-index=" + index + "]")
            .fadeOut("fast", () => {
                jQuery(this.gridStackEl)
                    .data("gridstack")
                    .removeWidget($gridStackItem.get(0), false);
                this.widgets.splice(index, 1);
            });
    }

    addWidget(widget: Widget): number {
        let len = this.widgets.push(widget);

        this.updateSubject.next({ add: [ len - 1 ] });

        return len - 1;
    }

    enterManageMode() {
        jQuery(this.gridStackEl)
            .removeClass("static")
            .data("gridstack")
            .enable();
        this.snackBarRef = this.snackBar.open("Click \"Finish\" to apply the changes", "Finish");
        this.enterManageModeSubject.next();
        this.snackBarRef.onAction().subscribe(() => {
            this.updateGridStackPositionData();
            this.leaveManageMode();
            this.snackBarRef.dismiss();
        });
        jQuery(this.gridStackEl)
            .find(".grid-stack-item")
            .addClass("grid-stack-item__shake");
    }

    leaveManageMode() {
        if (this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
        jQuery(this.gridStackEl)
            .addClass("static")
            .data("gridstack")
            .disable();
        jQuery(this.gridStackEl)
            .find(".grid-stack-item")
            .removeClass("grid-stack-item__shake");
        this.leaveManageModeSubject.next();
    }

    updateGridStackPositionData() {
        jQuery(this.gridStackEl)
            .children(".grid-stack-item")
            .each((index: number, el: HTMLElement) => {
                const $el = jQuery(el);

                if (this.widgets[$el.attr("data-index")]) {
                    this.widgets[$el.attr("data-index")].x = $el.attr("data-gs-x");
                    this.widgets[$el.attr("data-index")].y = $el.attr("data-gs-y");
                    this.widgets[$el.attr("data-index")].width = $el.attr("data-gs-width");
                    this.widgets[$el.attr("data-index")].height = $el.attr("data-gs-height");
                }
            });
        this.userService.updateGridStackData(JSON.stringify(this.widgets)).subscribe(); //TODO: add error handler
    }

    updateGridStackData(index: number, gridData: Widget) {
        this.widgets[index] = jQuery.extend(true, {}, gridData);
        this.userService.updateGridStackData(JSON.stringify(this.widgets)).subscribe(); //TODO: add error handler
        this.updateSubject.next({ update: [ index ] });
    }

    getWidgetWidth(index: number) {
        return jQuery(this.gridStackEl)
            .find(".grid-stack-item[data-index=" + index + "]")
            .width();
    }

    on(eventType: string): Observable<any> {
        switch (eventType) {
            case "init":
                if (this.isInit) {
                    return Observable.create((subscriber: Subscriber<any>) => {
                        subscriber.next();
                        subscriber.complete();
                    });
                } else {
                    return this.initSubject;
                }
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
