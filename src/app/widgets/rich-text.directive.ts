/**
 * Created by qhyang on 2017/10/10.
 */

import { Directive, ElementRef, OnChanges, Input } from "@angular/core";

@Directive({ selector: "[richText]" })
export class RichTextDirective implements OnChanges {
    @Input("richText") text: any;
    private editor: any;

    constructor(private el: ElementRef) {
        const Quill = require("quill");

        this.editor = new Quill(this.el.nativeElement, { readOnly: true });
    }

    ngOnChanges() {
        if (this.text) {
            this.editor.setContents(this.text);

            const twemoji = require("twemoji");

            twemoji.parse(this.el.nativeElement);
        }
    }
}