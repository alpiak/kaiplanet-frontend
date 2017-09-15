/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import { MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdFormFieldModule } from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdFormFieldModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdGridListModule, MdSnackBarModule, MdExpansionModule, MdInputModule, MdFormFieldModule ],
})
export class MaterialModule { }
