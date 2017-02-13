/**
 * Created by qhyang on 2017/2/13.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent }  from "./app.component";

@NgModule({
    imports:      [ BrowserModule ],
    // providers:    [ Logger ],
    declarations: [ AppComponent ],
    exports:      [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }