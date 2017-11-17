/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EarthComponent } from "./earth.component";

const earthBreathRoutes: Routes = [
    { path: "",  component: EarthComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(earthBreathRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EarthRoutingModule { }