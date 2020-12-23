import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CookbookComponent} from "./cookbook/cookbook/cookbook.component";
import {AddCookbookComponent} from "./cookbook/add-cookbook/add-cookbook.component";
import {AddRecipeComponent} from "./recipes/add-recipe/add-recipe.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/cookbooks/1', pathMatch: 'full' },
  { path: 'cookbook', component: CookbookComponent},
  { path: 'cookbooks/:id', component: CookbookComponent},
  { path: 'cookbook/add', component: AddCookbookComponent},
  { path: 'recipes/add', component: AddRecipeComponent, data: {title: 'Create recipe'}},
  { path: 'recipes/:cookbookId/:id', component: RecipeDetailComponent, data: {title: 'Recipe details'}},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
