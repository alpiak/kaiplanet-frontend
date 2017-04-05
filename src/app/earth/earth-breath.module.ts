/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }      from "@angular/core";

import { HomeComponent } from "./earth-breath.component";
import { HomeRoutingModule } from "./earth-breath-routing.module";

import { JumbotronComponent } from "./jumbotron.component";
import { GlobeComponent } from "./globe.component";
import { CrystalNavComponent } from "./crystal-nav.component";
import { TopToolPaneComponent } from "./top-tool-pane.component";

import { ScrollSceneService } from "./scroll-scene.service";

import { ScrollPinDirective } from "./scroll-pin.directive";
import { ScrollUpDirective } from "./scroll-up.directive";
import { AstralScrollSceneDirective } from "./astral-scroll-scene.directive";
import { FallingLeavesScrollSceneDirective } from "./falling-leaves-scroll-scene.directive";
import { ScrollSceneTextDirective } from "./scroll-scene-text.directive";
import { StickUpDirective } from "../stick-up.directive";
import { RippleDirective } from "../ripple.directive";
import { ScrollSceneBackgroundColorDirective } from "./scroll-scene-background-color.directive";

@NgModule({
    imports:      [ HomeRoutingModule ],
    providers:    [ ScrollSceneService ],
    declarations: [
        HomeComponent,
        JumbotronComponent,
        GlobeComponent,
        CrystalNavComponent,
        TopToolPaneComponent,
        ScrollPinDirective,
        ScrollUpDirective,
        AstralScrollSceneDirective,
        FallingLeavesScrollSceneDirective,
        ScrollSceneTextDirective,
        RippleDirective,
        StickUpDirective,
        ScrollSceneBackgroundColorDirective
    ]
})
export class HomeModule { }