/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }      from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { leftNavComponent } from "./left-nav.component";
import { gridStackComponent } from "./grid-stack.component";

@NgModule({
    imports:      [ HomeRoutingModule ],
    declarations: [
        HomeComponent,
        leftNavComponent,
        gridStackComponent
    ]
})
export class HomeModule { }