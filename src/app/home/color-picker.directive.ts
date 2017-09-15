/**
 * Created by qhyang on 2017/9/15.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

@Directive({ selector: "[color-picker]" })
export class ColorPickerDirective implements AfterViewInit {
    @Input() index: string;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const jQuery = require("jquery"),
            $overlay = jQuery(`
                <div id="hslPicker" style="position: absolute; width: 410px; pointer-events: auto; z-index: 1000; box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);"></div>
            `);

        jQuery(`
            <div style="position: fixed; z-index: 1000; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%;"></div>
        `)
            .append($overlay)
            .appendTo(jQuery(this.el.nativeElement).parent());

        function updateOverlayPosition() {
            let offset = jQuery(this.el.nativeElement).offset();

            $overlay.offset({
                top: offset.top + 30,
                left: offset.left - 380
            });
        }

        updateOverlayPosition();

        require("colorjoe/css/colorjoe");

        const colorjoe = require("colorjoe"),
            joe = colorjoe.hsl($overlay.get(0), "#fff", [
                'alpha',
                'currentColor',
                ['fields', {space: 'HSLA', limit: 100}],
                'hex'
            ]);
            joe.on("done", function(color: any) {
                console.log("Selected " + color.css());
            });
    }
}
