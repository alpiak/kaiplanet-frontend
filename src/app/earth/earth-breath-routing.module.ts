/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./earth-breath.component";

const homeRoutes: Routes = [
    { path: "earth",  component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }