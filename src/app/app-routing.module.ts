import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CookbookComponent} from "./cookbook/cookbook/cookbook.component";
import {AddCookbookComponent} from "./cookbook/add-cookbook/add-cookbook.component";
import {AddRecipeComponent} from "./recipes/add-recipe/add-recipe.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {SearchCookbookComponent} from "./cookbook/search-cookbook/search-cookbook.component";
import {ChefComponent} from "./chef/chef/chef.component";
import {JoinRequestsComponent} from "./join-requests/join-requests.component";
import {LoginComponent} from "./chef/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/cookbook', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'cookbook', component: CookbookComponent},
  { path: 'cookbooks/:id', component: CookbookComponent},
  { path: 'cookbook/add', component: AddCookbookComponent},
  { path: 'cookbook/search', component: SearchCookbookComponent},
  { path: 'recipes/add', component: AddRecipeComponent, data: {title: 'Create recipe'}},
  { path: 'recipes/:cookbookId/:id', component: RecipeDetailComponent, data: {title: 'Recipe details'}},
  { path: 'chefs/:id', component: ChefComponent},
  { path: 'requests', component: JoinRequestsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
