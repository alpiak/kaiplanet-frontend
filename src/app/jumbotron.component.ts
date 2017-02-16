/**
 * Created by qhyang on 2017/2/16.
 */


import { Component } from "@angular/core";

@Component({
    selector: "jumbotron",
    template: `
        <div class="jumbotron">
            <div class="mdl-grid">
                <h1>Hello</h1>
            </div>
        </div>
    `,
    styles: [require("./jumbotron.component.scss")]
})
export class JumbotronComponent { }