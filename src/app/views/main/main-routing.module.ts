import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainViewComponent } from "./page/main.component";

const mainRoutes: Routes = [
    { path: "", component: MainViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
    public static components = [
        MainViewComponent
    ];
}
