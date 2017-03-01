/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }      from "@angular/core";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";

import { JumbotronComponent } from "./jumbotron.component";
import { CrystalNavComponent } from "./crystal-nav.component";
import { scrollSceneComponent } from "./scroll-scene.component";

@NgModule({
    imports:      [ HomeRoutingModule ],
    declarations: [ HomeComponent, JumbotronComponent, CrystalNavComponent, scrollSceneComponent ]
})
export class HomeModule { }