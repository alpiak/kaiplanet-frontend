/**
 * Created by qhyang on 2017/9/13.
 */

/**
 * Created by qhyang on 2017/8/15.
 */

import { Component, OnInit, Inject } from "@angular/core";
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    template: require("./widget-settings-dialog.component.pug"),
    styles: [ require("./widget-settings-dialog.component.scss") ]
})
export class WidgetSettingsDialogComponent implements OnInit{

    constructor(@Inject(MD_DIALOG_DATA) private data: any) { }

    ngOnInit() {
        console.log(this.data);
    }
}
