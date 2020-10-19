import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AllRecipesComponent} from "./recipes/all-recipes/all-recipes.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AllRecipesComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
