import "hammerjs";
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
import {BranchsComponent} from "./branchs/branchs.component";
import {BranchListComponent} from "./branchs/branch-list/branch-list.component";
import {BranchEditComponent} from "./branchs/branch-edit/branch-edit.component";
import {BranchItemComponent} from "./branchs/branch-list/branch-item/branch-item.component";
import {BranchEmptyComponent} from "./branchs/branch-empty/branch-empty.component";
import {BrandService} from "./brands/brand.service";
import {AppRoutingModule} from "./app-routing.module";
import {MitCitySelectModule} from "./mit-city-select/mit-city-select.module";
import {BranchNewComponent} from "./branchs/branch-new/branch-new.component";
import {MitCitySelectService} from "./mit-city-select/mit-city-select.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdCardModule, MdInputModule, MaterialModule} from "@angular/material";
import {HeaderComponent} from "./header/header.component";
import {BrandNewComponent} from "./brands/brand-new/brand-new.component";
import {DialogResultExampleDialog} from "./share/dialog-result-example-dialog";
import {ToasterComponent} from "./share/toaster/toaster.component";
import {AccountService} from "./auth/account.service";
import {ChangepwdComponent} from "./auth/changepwd/changepwd.component";
import {UtilityService} from "./share/utility.service";
import {AuthGuardBrand} from "./auth/auth-guard-brand.service";
import {AuthGuardAdmin} from "./auth/auth-guard-admin.service";
import {PageNotFoundComponent} from "./share/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    BrandEditComponent,
    BrandListComponent,
    BrandItemComponent,
    BrandDetailComponent,
    SigninComponent,
    BranchsComponent,
    BranchListComponent,
    BranchEditComponent,
    BranchItemComponent,
    BranchNewComponent,
    BranchEmptyComponent,
    HeaderComponent,
    BrandNewComponent,
    DialogResultExampleDialog,
    ToasterComponent,
    ChangepwdComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MitCitySelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MaterialModule

  ],
  entryComponents: [
    DialogResultExampleDialog, ToasterComponent
  ],
  providers: [BrandService, MitCitySelectService, AccountService, UtilityService, AuthGuardAdmin, AuthGuardBrand],
  bootstrap: [AppComponent]
})
export class AppModule {
}
