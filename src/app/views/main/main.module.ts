import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppTableRowComponent } from "./components/app-table-row/app-table-row.component";

@NgModule({
    declarations: [
        ...MainRoutingModule.components,
        AppTableRowComponent,
    ],
    imports: [
        MainRoutingModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
