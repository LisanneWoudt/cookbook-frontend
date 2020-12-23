import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {CookbookComponent} from './cookbook/cookbook/cookbook.component';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import { RecipeInputFieldsComponent } from './recipes/recipe-input-fields/recipe-input-fields.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ToolbarRecipeDetailComponent } from './shared/toolbar/toolbar-recipe-detail/toolbar-recipe-detail.component';
import { DialogWithCancelButtonComponent } from './shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component';
import { ToolbarCheckComponent } from './shared/toolbar/toolbar-check/toolbar-check.component';

@NgModule({
  declarations: [
    AppComponent,
    CookbookComponent,
    ToolbarComponent,
    AddRecipeComponent,
    AddCookbookComponent,
    ToolbarWithoutMenuComponent,
    DialogComponent,
    RecipeInputFieldsComponent,
    RecipeDetailComponent,
    ToolbarRecipeDetailComponent,
    DialogWithCancelButtonComponent,
    ToolbarCheckComponent
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
        MatSelectModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    DialogWithCancelButtonComponent]
})
export class AppModule { }
