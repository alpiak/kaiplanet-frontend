/**
 * Created by qhyang on 2017/9/28.
 */

import { Subscription } from "rxjs";
import { Component, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

import { WidgetComponent } from "./widget.component";

@Component({
    selector: "rich-text-widget",
    template: require("./rich-text-widget.component.pug"),
    styles: [ require("./widget.component.scss"), require("./rich-text-widget.component.scss") ]
})
export class RichTextWidgetComponent extends WidgetComponent implements AfterViewInit, OnDestroy {
    private editor: any;
    private editable: boolean = false;
    private width: number;
    private subscriptions: Subscription[] = [];

    constructor(el: ElementRef, gridStackService: GridStackService, private bomService: BomService) { super(gridStackService, el); }

    ngAfterViewInit () {
        super.ngAfterViewInit();
        this.gridStackService.on("init").subscribe(() => {
            if (this.widget.data && this.widget.data.text) {
                this.editor.setContents(this.widget.data.text);
            }
            this.width = this.gridStackService.getWidgetWidth(this.index);
            this.subscriptions.push(this.bomService.onWindowResize().subscribe(() => {
                this.width = this.gridStackService.getWidgetWidth(this.index);
            }));
            this.subscriptions.push(this.gridStackService.on("resizestop").subscribe(() => {
                this.width = this.gridStackService.getWidgetWidth(this.index);
            }));
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private onEditorCreated(editor: any) {
        this.editor = editor;
    }

    private onEmojiSelect(emoji: any) {
        if (this.editor) {
            this.editor.focus();

            let range = this.editor.getSelection();

            this.editor.deleteText(range.index, range.length);

            const twemoji = require("twemoji");

            this.editor.insertText(range.index, twemoji.convert.fromCodePoint(emoji.unicode));
        }
    }

    private onSave() {
        if (!this.widget.data) {
            this.widget.data = {};
        }
        this.widget.data.text = this.editor.getContents();
        this.editable = false;
        this.gridStackService.updateGridStackData(this.index, this.widget);
    }
}
