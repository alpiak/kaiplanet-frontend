/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import {MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule} from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule ],
})
export class MaterialModule { }
