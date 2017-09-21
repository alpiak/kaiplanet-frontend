/**
 * Created by qhyang on 2017/3/7.
 */

import { Subscription } from "rxjs";
import { Component, AfterViewInit, OnDestroy } from "@angular/core";

import "gridstack";
import "gridstack/dist/gridstack.css";

import { GridStackService } from "./grid-stack.service";

import { Widget } from "../interfaces";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [ require("./grid-stack.component.scss") ]
})
export class gridStackComponent implements AfterViewInit, OnDestroy {
    widgets: Widget[];
    gridStack: HTMLElement;
    subscriptions: Subscription[] = [];

    constructor(private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        this.gridStackService.prepare().subscribe((gridStackData: any) => {
            this.widgets = gridStackData;
            setTimeout(() => {
                const jQuery = require("jquery"),
                    options = {
                    acceptWidgets: true,
                    cellHeight: "auto",
                    verticalMargin: 10,
                    alwaysShowResizeHandle: true,
                    animate: true,
                    disableDrag: true,
                    disableResize: true,
                    handle: ".grid-stack-item-handle",
                    removable: true
                };

                this.gridStackService.init(this.gridStack = jQuery(".grid-stack").get(0), options).subscribe(() => {
                    this.subscriptions.push(this.gridStackService.on("resizestart").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("resizestop").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("dragstart").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("dragstop").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                });
            }, 200);
        });
        this.gridStackService.on("update").subscribe((mutation) => {

            this.gridStackService.getWidgetData().subscribe(gridStackData => {
                if (mutation.add) {
                    mutation.add.forEach((widgetIndex: number) => this.widgets[widgetIndex] = gridStackData[widgetIndex]);
                }
                if (mutation.update) {
                    mutation.update.forEach((widgetIndex: number) => {
                        this.widgets[widgetIndex].config = gridStackData[widgetIndex].config;
                        this.widgets[widgetIndex].data = gridStackData[widgetIndex].data;
                    });
                }if (mutation.remove) {
                    mutation.remove.forEach((widgetIndex: number) => this.widgets.splice(widgetIndex, 1));
                }

                setTimeout(() => {
                    if (mutation.add) {
                        mutation.add.forEach((widgetIndex: number) => {
                            const widgetEl = jQuery(this.gridStack)
                                .children(".grid-stack-item")
                                .eq(widgetIndex)
                                .get(0);

                            jQuery(this.gridStack)
                                .data("gridstack")
                                .makeWidget(widgetEl);
                        });
                    }
                    this.gridStackService.updateGridStackPositionData();
                }, 200);
            });
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        this.gridStackService.destroy();
    }
    onClose(index: number) {
        if (this.widgets[index].type !== "header") {
            this.gridStackService.removeWidget(index);
        }
    }
}
