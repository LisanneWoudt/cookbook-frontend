import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AllRecipesComponent} from "./recipes/all-recipes/all-recipes.component";
import {AddCookbookComponent} from "./cookbook/add-cookbook/add-cookbook.component";
import {AddRecipeComponent} from "./recipes/add-recipe/add-recipe.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AllRecipesComponent, data: {title: 'Home'}},
  { path: 'cookbook/add', component: AddCookbookComponent, data: {title: 'Create cookbook'}},
  { path: 'recipes/add', component: AddRecipeComponent, data: {title: 'Create recipe'}},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
