/**
 * Created by qhyang on 2017/9/30.
 */

import { Subscription } from "rxjs";
import { Directive, ElementRef, AfterViewInit, OnDestroy, EventEmitter, Output } from "@angular/core";

import { BomService } from "../bom.service";

const jQuery = require("jquery"),
    $container = jQuery(`
        <div style="position: fixed; z-index: 1000; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%;"></div>
    `);


@Directive({ selector: "[emojiPanel]" })
export class EmojiPanelDirective implements AfterViewInit, OnDestroy {
    @Output() onEmojiSelect = new EventEmitter<any>();
    private subscriptions: Subscription[] = [];

    constructor(private el: ElementRef, private bomService: BomService) { }

    ngAfterViewInit() {
        const $overlay = jQuery(`
                <div style="display: none; position:absolute; pointer-events: all;"></div>
            `);

        $container.append($overlay)
            .appendTo(document.body);

        const $el = jQuery(this.el.nativeElement),
            updateOverlayPosition = () => {
                const $el = jQuery(this.el.nativeElement),
                    offset = $el.offset();

                $overlay.offset({
                    top: offset.top + 30,
                    left: offset.left + $el.width() - 145
                });
            };

        $el.bind("click", (e: any) => {
            e.stopPropagation();
            if ($overlay.css("display") === "none") {
               $overlay.css("display", "block");
                updateOverlayPosition();
            } else {
               $overlay.css("display", "none");
            }
        });
        this.subscriptions.push(this.bomService.windowResize().subscribe(() => {
            updateOverlayPosition();
        }));
        $overlay.bind("click", (e: any) => {
            e.stopPropagation();
        });
        this.subscriptions.push(this.bomService.documentClick().subscribe(() => {
            $overlay.css("display", "none");
        }));

        require("../../styles/emojipanel");
        require("../../scripts/emojipanel");

        const emojiPanel = new window["EmojiPanel"]({
            container: $overlay.get(0),
            pack_url: require("../../assets/twemoji.svg"),
            json_url: require("../../scripts/emojis.json")
        });

        emojiPanel.addListener('select', (emoji: any) => {
            this.onEmojiSelect.emit(emoji);
            $overlay.css("display", "none");

        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        $container.remove();
        jQuery(".EmojiPanel__svg").remove();
    }
}
