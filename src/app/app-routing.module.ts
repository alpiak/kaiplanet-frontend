/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/earth",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }