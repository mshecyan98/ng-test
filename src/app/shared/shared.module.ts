import { NgModule } from "@angular/core";

// https://material.angular.io/components/table/api
import { MatTableModule } from "@angular/material/table";

import { AlphabetOnlyDirective } from "./directives";

@NgModule({
    declarations: [AlphabetOnlyDirective],
    imports: [MatTableModule],
    exports: [MatTableModule, AlphabetOnlyDirective]
})
export class SharedModule { }
