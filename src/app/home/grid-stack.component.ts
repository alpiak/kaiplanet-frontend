/**
 * Created by qhyang on 2017/3/7.
 */

import { Component, OnInit } from "@angular/core";
import "gridstack";
import "gridstack/dist/gridstack.css";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [require("./grid-stack.component.scss")]
})
export class gridStackComponent implements OnInit {
    ngOnInit() {
        let JQuery = require("jquery"),

            options = {
                acceptWidgets: true,
                cellHeight: "auto",
                verticalMargin: 10,
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                animate: true,
                handle: ".grid-stack-item-handle",
                removable: true
            };

        JQuery(".grid-stack").gridstack(options);

        let grid = JQuery('.grid-stack').data('gridstack');

        JQuery(`
            <style type="text/css">
            
                /*TODO: remove later*/
                .grid-stack-item {
                  background: #fff;
                  border: 1px solid #000;
                }
                
                .grid-stack-item-handle {
                  height: 30px;
                }
            </style>
        `).appendTo("head");
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>`, 0, 0, 8, 2, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 8, 0, 3, 4, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 0, 2, 2, 3, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 2, 2, 6, 3, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 8, 0, 3, 4, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 0, 5, 8, 3, true
        );
        grid.addWidget(`
            <div class="grid-stack-item">
                <div class="grid-stack-item-content">
                    <div class="grid-stack-item-handle"></div>
                </div>
            </div>
            `, 11, 0, 1, 8, true
        );
    }
}