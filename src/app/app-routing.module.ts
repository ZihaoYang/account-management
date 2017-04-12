import {Routes, RouterModule} from "@angular/router";
import {BrandsComponent} from "./brands/brands.component";
import {BrandListComponent} from "./brands/brand-list/brand-list.component";
import {BrandEditComponent} from "./brands/brand-edit/brand-edit.component";
import {BrandDetailComponent} from "./brands/brand-detail/brand-detail.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {NgModule} from "@angular/core";
const appRoutes: Routes = [
  {path: '', redirectTo: '/brands', pathMatch: 'full'},
  {
    path: 'brands', component: BrandsComponent, children: [
    {path: '', component: BrandListComponent},
    {path: 'new', component: BrandEditComponent},
    {path: ':id', component: BrandDetailComponent},
    {path: ':id/edit', component: BrandEditComponent}
  ]
  },
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
