import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {AllRecipesComponent} from './recipes/all-recipes/all-recipes.component';
import {AppRoutingModule} from "./app-routing.module";
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AllRecipesComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
