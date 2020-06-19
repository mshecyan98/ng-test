import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { tableReducer } from "@ngrx/reducers/table.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TableEffects } from "@ngrx/effects/table.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ data: tableReducer }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([TableEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
