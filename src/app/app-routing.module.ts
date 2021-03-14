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
import {ResetPasswordComponent} from "./chef/reset-password/reset-password.component";
import {ChangePasswordComponent} from "./chef/change-password/change-password.component";
import {ErrorComponent} from "./error/error.component";
import {EditCookbookComponent} from "./cookbook/edit-cookbook/edit-cookbook.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cookbook', component: CookbookComponent},
  { path: 'cookbooks/:id', component: CookbookComponent},
  { path: 'cookbook/add', component: AddCookbookComponent},
  { path: 'cookbook/edit', component: EditCookbookComponent},
  { path: 'cookbook/search', component: SearchCookbookComponent},
  { path: 'recipes/add', component: AddRecipeComponent, data: {title: 'Create recipe'}},
  { path: 'recipes/:cookbookId/:id', component: RecipeDetailComponent, data: {title: 'Recipe details'}},
  { path: 'chefs/:id', component: ChefComponent},
  { path: 'requests', component: JoinRequestsComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'change-password', component: ChangePasswordComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
