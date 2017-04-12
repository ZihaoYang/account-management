import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {BrandsComponent} from "./brands/brands.component";
import {BrandEditComponent} from "./brands/brand-edit/brand-edit.component";
import {BrandListComponent} from "./brands/brand-list/brand-list.component";
import {BrandItemComponent} from "./brands/brand-list/brand-item/brand-item.component";
import {BrandDetailComponent} from "./brands/brand-detail/brand-detail.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {BranchComponent} from "./branch/branch.component";
import {BranchListComponent} from "./branch/branch-list/branch-list.component";
import {BranchEditComponent} from "./branch/branch-edit/branch-edit.component";
import {BranchDetailComponent} from "./branch/branch-detail/branch-detail.component";
import {BranchItemComponent} from "./branch/branch-list/branch-item/branch-item.component";
import {BranchEmptyComponent} from "./branch/branch-empty/branch-empty.component";
import {BrandService} from "./brands/brand.service";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    BrandEditComponent,
    BrandListComponent,
    BrandItemComponent,
    BrandDetailComponent,
    SigninComponent,
    BranchComponent,
    BranchListComponent,
    BranchEditComponent,
    BranchDetailComponent,
    BranchItemComponent,
    BranchEmptyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
