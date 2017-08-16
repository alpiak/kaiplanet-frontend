/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import {MdButtonModule, MdDialogModule, MdGridListModule} from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdDialogModule, MdGridListModule ],
    exports: [ MdButtonModule, MdDialogModule, MdGridListModule ],
})
export class MaterialModule { }
