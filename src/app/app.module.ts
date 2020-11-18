import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {AllRecipesComponent} from './recipes/all-recipes/all-recipes.component';
import {AppRoutingModule} from "./app-routing.module";
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { AddCookbookComponent } from './cookbook/add-cookbook/add-cookbook.component';
import { ToolbarWithoutMenuComponent } from './shared/toolbar/toolbar-without-menu/toolbar-without-menu.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    AllRecipesComponent,
    ToolbarComponent,
    AddRecipeComponent,
    AddCookbookComponent,
    ToolbarWithoutMenuComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
