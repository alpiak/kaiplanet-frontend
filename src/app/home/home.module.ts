/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";

@NgModule({
    imports:      [ HomeRoutingModule ],
    declarations: [
        HomeComponent,
        leftNavComponent
    ]
})
export class HomeModule { }