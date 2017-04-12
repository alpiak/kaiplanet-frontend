/**
 * Created by qhyang on 2017/3/6.
 */

import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [
    { path: "home",  component: HomeComponent }
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