/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EarthBreathComponent } from "./earth-breath.component";

const earthBreathRoutes: Routes = [
    { path: "earth-breath",  component: EarthBreathComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(earthBreathRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EarthBreathRoutingModule { }