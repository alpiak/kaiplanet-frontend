/**
 * Created by qhyang on 2017/7/27.
 */

import { NgModule } from "@angular/core";
import { MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdInputModule, MdSelectModule, MdFormFieldModule, MdRadioModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdExpansionModule, MdTooltipModule } from "@angular/material";

@NgModule({
    imports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdInputModule, MdSelectModule, MdFormFieldModule, MdRadioModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdExpansionModule, MdTooltipModule ],
    exports: [ MdButtonModule, MdMenuModule, MdDialogModule, MdSnackBarModule, MdInputModule, MdSelectModule, MdFormFieldModule, MdRadioModule, MdGridListModule, MdCardModule, MdProgressBarModule, MdExpansionModule, MdTooltipModule ],
})
export class MaterialModule { }
