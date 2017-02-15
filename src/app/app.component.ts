/**
 * Created by qhyang on 2017/2/13.
 */

import { Component } from "@angular/core";

@Component({
    selector: "app",
    template: `
        <div class="jumbotron">
            <div class="mdl-grid">
                <h1>Hello</h1>
            </div>
        </div>
    `,
    styles: [require("./app.component.scss")]
})
export class AppComponent {}