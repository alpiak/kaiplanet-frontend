/**
 * Created by qhyang on 2017/3/21.
 */

// import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";
//
// @Directive({ selector: "[waterfall]" })
// export class WaterfallDirective implements AfterViewInit {
//     @Input() backgroundColor: string;
//     @Input() frontColor: string;
//
//     constructor(private el: ElementRef) { }
//
//     ngAfterViewInit() {
//         const jQuery = require("jquery");
//
//         jQuery(this.el.nativeElement).find(".waterfall-container").css("background-color", this.backgroundColor);
//
//         let NightlyNiagaraMist = require("../../scripts/nightly-niagara-mist");
//
//         setTimeout(() => NightlyNiagaraMist(this.el.nativeElement, this.backgroundColor, this.frontColor), 300);
//     }
// }
