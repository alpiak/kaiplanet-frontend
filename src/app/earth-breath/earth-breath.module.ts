/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }      from "@angular/core";

import { HomeComponent } from "./earth-breath.component";
import { HomeRoutingModule } from "./earth-breath-routing.module";

import { JumbotronComponent } from "./jumbotron.component";
import { CrystalNavComponent } from "./crystal-nav.component";
import { scrollSceneComponent } from "./scroll-scene.component";

import { RippleDirective } from "../ripple.directive";
import { StickUpDirective } from "../stick-up.directive";

@NgModule({
    imports:      [ HomeRoutingModule ],
    declarations: [
        HomeComponent,
        JumbotronComponent,
        CrystalNavComponent,
        scrollSceneComponent,
        RippleDirective,
        StickUpDirective
    ]
})
export class HomeModule { }