/**
 * Created by qhyang on 2017/2/13.
 */

import { Component } from "@angular/core";

@Component({
    selector: "app",
    template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { name = "Angular"; }