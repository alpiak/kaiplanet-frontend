/**
 * Created by qhyang on 2017/9/30.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({ selector: "[emojiPanel]" })
export class EmojiPanelDirective implements AfterViewInit {

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        require("../../styles/emojipanel");

        const EmojiPanel = require("../../scripts/emojipanel");

        console.log(require("../../assets/twemoji.svg"));

        // new window["EmojiPanel"]({
        //     container: document.body,
        //     trigger: this.el.nativeElement,
        //     pack_url: require("../../assets/twemoji.svg")
        // });
    }
}
