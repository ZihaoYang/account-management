import {Routes, RouterModule} from "@angular/router";
import {BrandsComponent} from "./brands/brands.component";
import {BrandListComponent} from "./brands/brand-list/brand-list.component";
import {BrandEditComponent} from "./brands/brand-edit/brand-edit.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {NgModule} from "@angular/core";
import {BranchsComponent} from "./branchs/branchs.component";
import {BranchNewComponent} from "./branchs/branch-new/branch-new.component";
import {BranchListComponent} from "./branchs/branch-list/branch-list.component";
import {BranchEditComponent} from "./branchs/branch-edit/branch-edit.component";
import {BrandNewComponent} from "./brands/brand-new/brand-new.component";
import {ChangepwdComponent} from "./auth/changepwd/changepwd.component";
import {AuthGuardAdmin} from "./auth/auth-guard-admin.service";
import {AuthGuardBrand} from "./auth/auth-guard-brand.service";
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";
// const appRoutes: Routes = [
//   {path: '', redirectTo: '/branchs', pathMatch: 'full'},
//   {
//     path: 'brands', component: BrandsComponent, children: [
//     {path: '', component: BrandListComponent},
//     {path: 'new', component: BrandNewComponent},
//     {path: ':id', component: BrandEditComponent}
//   ]
//   },
//   {
//     path: 'branchs', component: BranchsComponent, children: [
//     {path: '', component: BranchListComponent},
//     {path: 'new', component: BranchNewComponent},
//     {path: ':id', component: BranchEditComponent}
//   ]
//   },
//   {path: 'signin', component: SigninComponent},
//   {path: 'changepwd', component: ChangepwdComponent}
// ];

const appRoutes: Routes = [
  {
    path: 'brands', component: BrandsComponent, canActivate: [AuthGuardAdmin], children: [
    {path: '', component: BrandListComponent},
    {path: 'new', component: BrandNewComponent},
    {path: ':id', component: BrandEditComponent},
    {
      path: ':id/branchs', component: BranchsComponent, children: [
      {path: '', component: BranchListComponent},
      {path: 'new', component: BranchNewComponent},
      {path: ':branchid', component: BranchEditComponent}
    ]
    }
  ]
  },
  {
    path: 'branchs', component: BranchsComponent, canActivate: [AuthGuardBrand], children: [
    {path: '', component: BranchNewComponent},
    {path: 'new', component: BranchNewComponent},
    {path: ':branchid', component: BranchEditComponent}
  ]

  },
  {path: 'signin', component: SigninComponent},
  {path: 'changepwd', component: ChangepwdComponent},
  {path: 'page-not-found', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
